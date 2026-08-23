/**
 * Generate professional AI pronunciation audio for every vocabulary word and
 * question in the database, upload it to Supabase Storage, and write the
 * resulting public URL back into the `audio_url` column.
 *
 * Uses ElevenLabs' multilingual TTS model, which handles Arabic well and
 * sounds close to a native speaker (far better than browser TTS).
 *
 * SETUP (one time):
 *   1. Create a free/paid account at https://elevenlabs.io and grab an API key
 *      from your profile settings.
 *   2. In your Supabase project dashboard: Storage -> New bucket -> name it
 *      "audio" -> toggle "Public bucket" ON -> Create.
 *   3. Add these to a local .env file (do NOT commit it):
 *        ELEVENLABS_API_KEY=your_key_here
 *        ELEVENLABS_VOICE_ID=your_chosen_voice_id   (see note below)
 *        NEXT_PUBLIC_SUPABASE_URL=https://xxxx.supabase.co
 *        SUPABASE_SERVICE_ROLE_KEY=your_service_role_key   (Project Settings -> API)
 *
 *      Voice ID: open https://elevenlabs.io/app/voice-library, search
 *      "Arabic", preview a couple, and copy the Voice ID of the one you like.
 *      "Multilingual v2" voices work well for Levantine pronunciation.
 *
 * RUN:
 *   npm install @supabase/supabase-js dotenv --save-dev
 *   node --env-file=.env scripts/generate-audio.mjs
 *
 * The script is idempotent — it skips any row that already has an audio_url,
 * so you can re-run it any time you add new vocabulary/questions.
 */

import { createClient } from "@supabase/supabase-js";

const {
  ELEVENLABS_API_KEY,
  ELEVENLABS_VOICE_ID,
  NEXT_PUBLIC_SUPABASE_URL,
  SUPABASE_SERVICE_ROLE_KEY,
} = process.env;

if (!ELEVENLABS_API_KEY || !ELEVENLABS_VOICE_ID || !NEXT_PUBLIC_SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
  console.error(
    "Missing required env vars. Need ELEVENLABS_API_KEY, ELEVENLABS_VOICE_ID, NEXT_PUBLIC_SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY."
  );
  process.exit(1);
}

const supabase = createClient(NEXT_PUBLIC_SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);
const BUCKET = "audio";

async function synthesize(text) {
  const res = await fetch(
    `https://api.elevenlabs.io/v1/text-to-speech/${ELEVENLABS_VOICE_ID}`,
    {
      method: "POST",
      headers: {
        "xi-api-key": ELEVENLABS_API_KEY,
        "Content-Type": "application/json",
        Accept: "audio/mpeg",
      },
      body: JSON.stringify({
        text,
        model_id: "eleven_multilingual_v2",
        voice_settings: { stability: 0.55, similarity_boost: 0.85 },
      }),
    }
  );
  if (!res.ok) {
    throw new Error(`ElevenLabs error ${res.status}: ${await res.text()}`);
  }
  return Buffer.from(await res.arrayBuffer());
}

async function uploadAndGetUrl(path, buffer) {
  const { error } = await supabase.storage
    .from(BUCKET)
    .upload(path, buffer, { contentType: "audio/mpeg", upsert: true });
  if (error) throw error;
  const { data } = supabase.storage.from(BUCKET).getPublicUrl(path);
  return data.publicUrl;
}

async function processTable(table, textColumn, idColumn = "id") {
  const { data: rows, error } = await supabase
    .from(table)
    .select(`${idColumn}, ${textColumn}, audio_url`)
    .is("audio_url", null);
  if (error) throw error;

  console.log(`\n${table}: ${rows.length} row(s) need audio`);

  for (const row of rows) {
    const text = row[textColumn];
    if (!text) continue;
    try {
      console.log(`  Generating: ${text}`);
      const audioBuffer = await synthesize(text);
      const path = `${table}/${row[idColumn]}.mp3`;
      const url = await uploadAndGetUrl(path, audioBuffer);
      const { error: updateError } = await supabase
        .from(table)
        .update({ audio_url: url })
        .eq(idColumn, row[idColumn]);
      if (updateError) throw updateError;
      console.log(`  -> saved ${url}`);
      // Be polite to the API rate limits.
      await new Promise((r) => setTimeout(r, 350));
    } catch (err) {
      console.error(`  FAILED for "${text}":`, err.message);
    }
  }
}

async function main() {
  await processTable("vocabulary", "arabic_text");
  await processTable("questions", "arabic_text");
  console.log("\nDone.");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
