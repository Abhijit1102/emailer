# 📧 Resilient Email Sending Service

A production-ready email dispatch system built with **Next.js**, featuring:

- ✅ Multiple providers: Mailtrap API + Mailtrap SMTP
- 🔁 Automatic retries with exponential backoff
- 🚦 Circuit breaker for failing providers
- ⏱️ Rate limiting to prevent abuse
- 🧠 Idempotency via message ID
- 📦 Modular architecture (pluggable providers)

## 📦 Installation Guide
**Follow these steps to install and run the project locally:**

🔧 1. Clone the Repository
```bash
git https://github.com/Abhijit1102/emailer.git
cd emailer

```
📁 2. Install Dependencies

```bash
npm install

```

🔐 3. Configure Environment Variables `.env`

```bash
    MAIL_TRAP_API_KEY=your-mailtrap-api-token
    MAILTRAP_SMTP_USER=apismtp@mailtrap.io
    MAILTRAP_SMTP_PASS=your-mailtrap-api-token
```
▶️ 4. Start the Dev Server

```bash
 npm run dev
```

---

## 🚀 Tech Stack

- **Framework**: Next.js (API Routes)
- **Providers**:
  - `ProviderA`: Mailtrap Email Sending API
  - `ProviderB`: Mailtrap Live SMTP via Nodemailer
- **Utilities**: Custom retry, circuit breaker, rate limiter, logger

---

## 🗂 Project Structure

```bash
📁 lib/
├── EmailService.ts          # Core service with fallback + logic
├── providers/
│   ├── ProviderA.ts         # Mailtrap API sender
│   └── ProviderB.ts         # Mailtrap Live SMTP sender
├── store/
│   └── StatusStore.ts       # In-memory status tracker (idempotency)
└── utils/
    ├── circuitBreaker.ts    # Circuit breaker implementation
    ├── logger.ts            # Custom logger
    ├── rateLimiter.ts       # Rate limiter (in-memory)
    └── retry.ts             # Exponential backoff retry
```

## 🔐 Environment Variables
### Create a .env.local file in the root:

```bash
MAIL_TRAP_API_KEY=your-mailtrap-api-token
MAILTRAP_SMTP_USER=apismtp@mailtrap.io
MAILTRAP_SMTP_PASS=your-mailtrap-api-token
```

## 📤 API Endpoint
### POST `/api/v1/send-email`
**Send an email using available providers (fallback enabled).**

```json
{
  "to": "recipient@example.com",
  "subject": "Hello",
  "body": "This is a test email",
  "id": "unique-request-id-123"
}

```
## Response Example

```json
{
  "status": "sent",
  "provider": "MailtrapAPI"
}
```

## 🧪 Testing the API
## Using `curl`

```bash
curl -X POST http://localhost:3000/api/v1/send-email `
  -H "Content-Type: application/json" `
  -d (Get-Content -Raw -Path "./data.json")

```

## 📦 Dependencies
- Install the testing utilities:
```bash
 npm install --save-dev jest ts-jest supertest node-mocks-http @types/jest @types/supertest 

```
## ▶️ Run Tests

npm test
```bash
   npm run test
```

## 📈 Provider Fallback Logic
 - 1. Tries ProviderA (Mailtrap API)

 - 2. If failure or circuit open, falls back to ProviderB (SMTP)

 - 3. Retries 3 times with exponential backoff

 - 4. Records failures and opens circuits after repeated issues

