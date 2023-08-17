import toast from "react-hot-toast";

import useSignInModal from "@/hooks/modals/useSignInModal";
import useUploadModal from "@/hooks/modals/useUploadModal";
import { useUser } from "@supabase/auth-helpers-react";

const useUploadSong = () => {
  const { onOpen: openAuthModal } = useSignInModal();
  const user = useUser();
  const { onOpen: openUploadModal } = useUploadModal();

  const uploadSong = () => {
    if (!user) {
      toast("You need to login before continue", {
        icon: "🔒",
      });
      return openAuthModal();
    }
    return openUploadModal();
  };

  return { uploadSong };
};
export default useUploadSong;
