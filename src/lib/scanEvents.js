const VALID_OUTCOMES = new Set(['sleepy', 'steady', 'bright', 'no_face']);

export const recordScanEvent = async ({ outcome, faceCheckUsed }) => {
  const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
  const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseAnonKey || !VALID_OUTCOMES.has(outcome)) return false;

  try {
    const response = await fetch(`${supabaseUrl.replace(/\/$/, '')}/rest/v1/scan_events`, {
      method: 'POST',
      headers: {
        apikey: supabaseAnonKey,
        Authorization: `Bearer ${supabaseAnonKey}`,
        'Content-Type': 'application/json',
        Prefer: 'return=minimal',
      },
      body: JSON.stringify({ outcome, face_check_used: Boolean(faceCheckUsed) }),
    });
    return response.ok;
  } catch {
    return false;
  }
};
