// src/lib/supabase.js
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// 1 so i have the sign up and login page and when i do signup and after that doing the login
// with signup credentials i will be able to go to the dashbord understand for that i included
// the express and mongo db which works fine for that understand
// 2 but now i want to integrate the supabase instead of the express and mongo db understand the point
// i want to use the supabase replacing the backend understand 
// 3 so do guide me from the scratch what shuld i do for that because i don't have the good knowledge 
// of the supabase as well understand so do help me to include supabase to my project
// 4 do guide me over the supabase because how to create a table and work with the sql editor just explain me
// indetails and guide me when supabase part is come get my point get it now 
