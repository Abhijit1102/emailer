export const ProviderA = {
  name: "MailtrapAPI",

  async sendEmail(to: string, subject: string, text: string) {
    const API_KEY = process.env.MAIL_TRAP_API_KEY;
    if (!API_KEY) throw new Error("Missing Mailtrap API key");

    const res = await fetch("https://send.api.mailtrap.io/api/send", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: {
          email: "hello@demomailtrap.com",
          name: "Mailtrap Test",
        },
        to: [{ email: to }],
        subject,
        text,
        category: "ServiceMailer",
      }),
    });

    if (!res.ok) {
      const error = await res.text();
      throw new Error(`Mailtrap failed: ${res.status} - ${error}`);
    }

    return res.json();
  },
};
