import { OAuth2Client } from "google-auth-library";

const client = new OAuth2Client(
  process.env.19161840368-lodj5j4fiv5nnfb2kphc9gcavsi9qn7i.apps.googleusercontent.com
);

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({
      error: "Method Not Allowed"
    });
  }

  try {
    const { credential } = req.body || {};

    if (!credential) {
      return res.status(400).json({
        error: "Credential tidak ada"
      });
    }

    const ticket = await client.verifyIdToken({
      idToken: credential,
      audience: process.env.GOOGLE_CLIENT_ID
    });

    const payload = ticket.getPayload();

    return res.status(200).json({
      success: true,
      user: {
        id: payload.sub,
        name: payload.name,
        email: payload.email,
        picture: payload.picture
      }
    });
  } catch (error) {
    console.error(error);

    return res.status(401).json({
      success: false,
      error: "Google credential tidak valid"
    });
  }
}