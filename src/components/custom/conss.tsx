import { useSession } from "next-auth/react";

export default function MyComponent() {
  const { data: session } = useSession();

  if (session) {
    console.log("Signed JWT:", session.accessToken);
  }

  return <div>Check console for the token</div>;
}
