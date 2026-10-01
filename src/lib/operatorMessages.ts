import { supabase } from "@/lib/supabase";

export async function sendOperatorMessage({
  title,
  content,
  isAnonymous,
  userId,
}: {
  title: string;
  content: string;
  isAnonymous: boolean;
  userId: string;
}): Promise<string | null> {
  const { error } = await supabase.from("operator_messages").insert({
    user_id: isAnonymous ? null : userId,
    title: title.trim(),
    content: content.trim(),
    is_anonymous: isAnonymous,
  });

  return error ? error.message : null;
}
