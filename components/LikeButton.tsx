"use client";

import { useSessionContext, useUser } from "@supabase/auth-helpers-react";
import { useRouter } from "next/router";
import { useState } from "react";

import useAuthModal from "@/hooks/useAuthModal";
import { useUser } from "@/hooks/useUser";

interface LikeButtonProps {
    songId: string;
};

const LikeButton: React.FC<LikeButtonProps> = ({
    songId
}) => {
    const router = useRouter();
    const{ supabaseClient } = useSessionContext();

const authModal = useAuthModal();
const { user } = useUser();

const [isLiked, setIsLiked] = useState(false);
// {done till 3:44:07}
    return(
        <div>
            Like Button!
        </div>
    );
}

export default LikeButton;