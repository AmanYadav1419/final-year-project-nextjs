"use client";

import { Database } from "@/database.types";
import { createClientComponentClient} from "@supabase/auth-helpers-nextjs";
import { SessionContextProvider } from "@supabase/auth-helpers-react";
import { useState } from "react";

/*Subabase is a open-source Firebase alternative that provides a backend as a service,
 including a database, authentication, and real-time subscriptions."use client*/


interface SupabaseProviderProps {
    children: React.ReactNode;
};

const SupabaseProvider: React.FC<SupabaseProviderProps> =({
    children
}) => {
   const [supabaseClient] = useState(() =>    
    //  The useState hook initializes the supabaseClient state variable
    createClientComponentClient<Database>()
);

return (
    <SessionContextProvider supabaseClient={supabaseClient}>
        {children}
    </SessionContextProvider>
)
}

export default SupabaseProvider;