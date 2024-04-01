import {
  SignInButton,
  useProfile,
  useSignIn,
} from "@farcaster/auth-kit";
import { getCsrfToken } from "next-auth/react";
import { useCallback, useState } from "react";

export const SignInWithFarcaster = () => {
  const [error, setError] = useState(false);
  const {
    isAuthenticated,
    profile: {
      username,
      pfpUrl,
      fid
    }
  } = useProfile();

  const {
    signIn,
    signOut
  } = useSignIn({
    onSuccess: ({ fid }) => console.log('Your fid:', fid),
  });

  const getNonce = useCallback(async () => {
    const nonce = await getCsrfToken();
    if (!nonce) throw new Error("Unable to generate nonce");
    return nonce;
  }, []);

  return (
    <div>
      {<div >
        <SignInButton nonce={() => getNonce()} onError={() => setError(true)} />
        {error && <div>Unable to sign in at this time.</div>}
      </div>}
    </div>

  )
}

export const FarcasterProfile = () => {
  const {
    isAuthenticated,
    profile: {
      username,
      pfpUrl,
      fid
    }
  } = useProfile();

  console.log('fid')

  return isAuthenticated ? (
    <div style={{ fontFamily: "sans-serif" }}>
      <p>Signed in as {username}: fid {fid}</p>
    </div>
  ) : (
    <p>
      Click the Sign in with Farcaster button above, then scan the QR code to
      sign in.
    </p>
  );
}