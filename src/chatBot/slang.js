import dotenv from 'dotenv'
import { resolve, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import { Mistral } from '@mistralai/mistralai'

const __dirname = dirname(fileURLToPath(import.meta.url))
dotenv.config({ path: resolve(__dirname, '../../../.env') })

const abusivePatterns = [
  /b[i1][t+]?ch[e3]r[s$]?/i,
  /b[i1][t+]?ch[e3][s$]/i,
  /b[i1][t+]?ch[i1]ng?/i,
  /b[l1][o0]wj[o0]b[s$]?/i,
  /c[l1][i1][t+]/i,

  /^(c|k|ck|q)[o0](c|k|ck|q)[s$]?$/i,
  /(c|k|ck|q)[o0](c|k|ck|q)[s$]?u/i,
  /(c|k|ck|q)[o0](c|k|ck|q)[s$]?u(c|k|ck|q)[e3]d/i,
  /(c|k|ck|q)[o0](c|k|ck|q)[s$]?u(c|k|ck|q)[e3]r/i,
  /(c|k|ck|q)[o0](c|k|ck|q)[s$]?u(c|k|ck|q)[i1]ng/i,
  /(c|k|ck|q)[o0](c|k|ck|q)[s$]?u(c|k|ck|q)[s$]/i,

  /^cum[s$]?$/i,
  /cumm??[e3]r/i,
  /cumm?[i1]ngcock/i,
  /(c|k|ck|q)um[s$]h[o0][t+]/i,

  /(c|k|ck|q)un[i1][l1][i1]ngu[s$]/i,
  /(c|k|ck|q)un[i1][l1][l1][i1]ngu[s$]/i,
  /(c|k|ck|q)unn[i1][l1][i1]ngu[s$]/i,

  /(c|k|ck|q)un[t+][s$]?/i,
  /(c|k|ck|q)un[t+][l1][i1](c|k|ck|q)/i,
  /(c|k|ck|q)un[t+][l1][i1](c|k|ck|q)[e3]r/i,
  /(c|k|ck|q)un[t+][l1][i1](c|k|ck|q)[i1]ng/i,

  /cyb[e3]r(ph|f)u(c|k|ck|q)/i,
  /d[a@]mn/i,
  /d[i1]ck/i,
  /d[i1][l1]d[o0]/i,
  /d[i1][l1]d[o0][s$]/i,

  /d[i1]n(c|k|ck|q)/i,
  /d[i1]n(c|k|ck|q)[s$]/i,

  /[e3]j[a@]cu[l1]/i,

  /(ph|f)[a@]g[s$]?/i,
  /(ph|f)[a@]gg[i1]ng/i,
  /(ph|f)[a@]gg?[o0][t+][s$]?/i,
  /(ph|f)[a@]gg[s$]/i,

  /(ph|f)[e3][l1][l1]?[a@][t+][i1][o0]/i,

  /(ph|f)u(c|k|ck|q)/i,
  /(ph|f)u(c|k|ck|q)[s$]?/i,

  /g[a@]ngb[a@]ng[s$]?/i,
  /g[a@]ngb[a@]ng[e3]d/i,

  /g[a@]y/i,
  /h[o0]m?m[o0]/i,
  /h[o0]rny/i,

  /j[a@](c|k|ck|q)-?[o0](ph|f)(ph|f)?/i,
  /j[e3]rk-?[o0](ph|f)(ph|f)?/i,

  /j[i1][s$z][s$z]?m?/i,

  /[ck][o0]ndum[s$]?/i,

  /mast(e|ur)b(8|ait|ate)/i,

  /n+[i1]+[gq]+[e3]*r+[s$]*/i,

  /[o0]rg[a@][s$][i1]m[s$]?/i,
  /[o0]rg[a@][s$]m[s$]?/i,

  /p[e3]nn?[i1][s$]/i,

  /p[i1][s$][s$]/i,
  /p[i1][s$][s$][o0](ph|f)(ph|f)/i,

  /p[o0]rn/i,
  /p[o0]rn[o0][s$]?/i,
  /p[o0]rn[o0]gr[a@]phy/i,

  /pr[i1]ck[s$]?/i,

  /pu[s$][s$][i1][e3][s$]/i,
  /pu[s$][s$]y[s$]?/i,

  /[s$][e3]x/i,
  /[s$]h[i1][t+][s$]?/i,
  /[s$][l1]u[t+][s$]?/i,
  /[s$]mu[t+][s$]?/i,
  /[s$]punk[s$]?/i,

  /[t+]w[a@][t+][s$]?/i,

  /\bmc\b/i,
  /\bbc\b/i,
  /m+a+d+[ae]r+c+h?[o0]*d+/i,
  /m+a+d+r+c+h?[o0]*d+/i,
  /b+h+[ae]n+c+h?[o0]*d+/i,
  /b+[ae]h+n+c+h?[o0]*d+/i,

  /b+h+[oa]?[s\$]*d+k/i,
  /b+[ae]h+n+k+[ae]?\s*l+[o0]*d+[ae]/i,
  /bsdk/i,

  /c+h+u+t+[i1y]+[ae]/i,
  /c+h+u+t+/i,

  /g+[ae]n+d+u+/i,
  /g+[ae]n+d+/i,
  /g+a+a+n+d+/i,

  /l+u+n+d+/i,
  /l+o+d+[uua]*/i,

  /r+a+n+d+[i1]/i,
  /r+a+n+d/i,

  /h+a+r+a+m+[i1]/i,
  /haram/i,

  /k+a+m+[i1]n+[aey]+/i,

  /chod/i,

  /k+u+t+t+[ae]/i,
  /k+a+m+[i1]n+a+/i,

  /m+a+a+\s*k+[i1]/i,
  /t+e+r+[i1]\s*m+a+a+/i,

  /b+[ae]h+n+\s*k+e+\s*l+[o0]*d+e+/i,

  /b+e+t+[i1]+c+h?[o0]*d+/i,

  /b+a+k+c+h?[o0]*d+/i,

  /l+[ae]v+d+e+/i,
  /l+a+w+d+e+/i,

  /j+h+a+t+u+/i,

  /b+h+[o0]+s+d+[i1]k+e+/i,

  /c+h+u+\*/i,

  /m+u+t+h+/i,
  /t+a+t+t+e+/i,
  /c+h+a+k+k+e+/i,
  /h+i+j+r+a+/i
]

function normalizeText(text) {
  return text
    .toLowerCase()
    .replace(/[@4]/g, "a")
    .replace(/[3]/g, "e")
    .replace(/[1!|]/g, "i")
    .replace(/[0]/g, "o")
    .replace(/[$5]/g, "s")
    .replace(/[7]/g, "t")
    .replace(/[^a-z0-9\s]/gi, " ") // Keep spaces to prevent word merging!
    .replace(/\s+/g, " ")          // Collapse multiple spaces into one
    .trim()
}

function containsAbuse(text) {
  return abusivePatterns.some((pattern) => pattern.test(text))
}

function containsNonEnglish(text) {
  return /[^\x00-\x7F]/.test(text)
}

// ─── Mistral-based moderation fallback ───────────────────────────────────────
// Replaces OpenAI's moderations.create() for non-English content that regex
// cannot reliably catch. Sends a tight classification prompt to Mistral and
// parses a single-word YES/NO verdict. Fails open (returns safe) on any error
// so a transient API hiccup never blocks a legitimate user.
let _mistralClient = null
function getMistralClient() {
  if (!_mistralClient) {
    const apiKey = (process.env.MISTRALAI_API_KEY || '').trim()
    if (!apiKey) return null
    _mistralClient = new Mistral({ apiKey })
  }
  return _mistralClient
}

async function isSafeViaMistral(message) {
  const client = getMistralClient()
  if (!client) return true  // No key configured — fail open

  try {
    const response = await client.chat.complete({
      model: 'mistral-small-latest',   // Cheapest model — fast classification only
      messages: [
        {
          role: 'system',
          content: `You are a strict content moderation classifier.
Your ONLY job is to decide if a message contains harmful, abusive, hateful, sexual, violent, or otherwise inappropriate content.

Respond with EXACTLY one word:
- YES  → if the message IS harmful/abusive/inappropriate
- NO   → if the message is safe and appropriate

Do not explain. Do not add punctuation. Do not say anything else.`
        },
        {
          role: 'user',
          content: message
        }
      ],
      maxTokens: 5,
      temperature: 0,
    })

    const verdict = response?.choices?.[0]?.message?.content?.trim().toUpperCase()
    return verdict !== 'YES'  // true = safe, false = abusive
  } catch (err) {
    console.warn('Mistral moderation check skipped due to error:', err?.message || err)
    return true  // Fail open — don't block users on API errors
  }
}

// Strip email addresses before all checks to prevent false positives.
// Email addresses (e.g. user@gmail.com) contain '@', digits, and domain parts
// that can accidentally match abusive regex patterns after normalisation.
function stripEmails(text) {
  return text.replace(/[a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}/g, '')
}

// Deduplicate repeated letters per-word, not across the whole sentence
function removeDuplicateLetters(text) {
  return text
    .split(" ")
    .map(word => word.replace(/(.)\1+/g, "$1"))
    .join(" ")
}

export async function isAbusive(userPrompt) {
  // Step 1: Strip emails
  const promptWithoutEmails = stripEmails(userPrompt)
  const sanitizedPrompt = promptWithoutEmails.replace(/\bgarg\b/gi, '')

  // Step 2: Normalize while maintaining word separation
  const normalizedWithSpaces = normalizeText(sanitizedPrompt)
  const normalizedDeduplicated = removeDuplicateLetters(normalizedWithSpaces)

  // Step 3: Check regex patterns on space-preserved versions
  if (
    containsAbuse(sanitizedPrompt) ||
    containsAbuse(normalizedWithSpaces) ||
    containsAbuse(normalizedDeduplicated)
  ) {
    return true
  }

  // Step 4: Fallback to Mistral classification for non-English content
  // that regex cannot reliably catch (e.g. Hindi/Urdu in Unicode script)
  const isNonEnglish = containsNonEnglish(promptWithoutEmails)
  if (isNonEnglish) {
    const safe = await isSafeViaMistral(promptWithoutEmails)
    if (!safe) return true
  }

  return false
}
