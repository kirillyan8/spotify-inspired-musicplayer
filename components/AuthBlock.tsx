import React, { FC } from "react";
import { ThemeSupa, ViewType } from "@supabase/auth-ui-shared";
import { Auth } from "@supabase/auth-ui-react";
import { useSupabaseClient } from "@supabase/auth-helpers-react";

interface AuthBlockProps {
  view?: ViewType;
}

const AuthBlock: FC<AuthBlockProps> = ({ view }) => {
  const supabaseClient = useSupabaseClient();

  return (
    <Auth
      view={view}
      supabaseClient={supabaseClient}
      theme="dark"
      magicLink
      providers={["github", "discord"]}
      appearance={{
        theme: ThemeSupa,
        variables: {
          default: {
            colors: {
              brand: "#404040",
              brandAccent: "#22c22e",
            },
          },
        },
      }}
    />
  );
};

export default AuthBlock;
