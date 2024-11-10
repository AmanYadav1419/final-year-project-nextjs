"use client";   //sfc

import { useSessionContext,
        useSupabaseClient
     } from "@supabase/auth-helpers-react";
import Modal from "./Modal";
import { useRouter } from "next/navigation";
import { Auth } from "@supabase/auth-ui-react";
import { useAmp } from "next/amp";
import useAuthModal from "@/hooks/useAuthModal";
import { ThemeSupa } from "@supabase/auth-ui-shared";
// import { useEffect } from "react";

const AuthModal = () => {
    const supabaseClient = useSupabaseClient();
    const router = useRouter();
    const { session } = useSessionContext();
    const {onClose, isOpen} = useAuthModal();


    const onChange = (open: boolean) => {
        if (!open){
            onClose();
        }

    }

    return (
        <Modal
            title="Welcome back"
            description="Login to your account"
            isOpen={isOpen}    //hide loggin page {isOpen}
            // fixed the typo in the prop name by aman yadav
            OnChange={onChange}
        >
            {/* Auth modal children! */}
            <Auth
            theme="dark"
            magicLink
            // we can add more providers for authentication like google, twitter, etc. commented out by aman yadav
            providers={["github"]}
                supabaseClient={supabaseClient}
                appearance={{
                    theme: ThemeSupa,
                    variables:{
                        default: {
                            colors: {
                                brand: '#404040',
                                brandAccent: '#22c55e'
                            }
                        }
                    }
                }}
            />

        </Modal>
    );
}

export default AuthModal;

// video start from 2:12:40