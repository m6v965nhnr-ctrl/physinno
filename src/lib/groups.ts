import { supabase } from "@/lib/supabase";

export type Group = {
  id: string;
  name: string;
  description: string | null;
  is_private: boolean;
  owner_id: string;
  created_at: string;
};

export type GroupMember = {
  id: string;
  group_id: string;
  user_id: string;
  role: "owner" | "member";
  joined_at: string;
};

export type GroupMessage = {
  id: string;
  group_id: string;
  user_id: string;
  content: string;
  created_at: string;
};

// 公開グループの一覧（探して参加できるもの）
export async function listPublicGroups() {
  const { data } = await supabase
    .from("groups")
    .select("*")
    .eq("is_private", false)
    .order("created_at", { ascending: false });

  return (data || []) as Group[];
}

// 自分が参加しているグループ一覧
export async function listMyGroups(userId: string) {
  const { data } = await supabase
    .from("group_members")
    .select("group_id, role, groups(*)")
    .eq("user_id", userId);

  return (data || [])
    .map((row) => {
      const group = row.groups as unknown as Group | null;
      return group ? { ...group, myRole: row.role as "owner" | "member" } : null;
    })
    .filter((g): g is Group & { myRole: "owner" | "member" } => g !== null);
}

export async function getGroup(id: string) {
  const { data } = await supabase
    .from("groups")
    .select("*")
    .eq("id", id)
    .maybeSingle();

  return data as Group | null;
}

export async function isGroupMember(groupId: string, userId: string) {
  const { data } = await supabase
    .from("group_members")
    .select("id")
    .eq("group_id", groupId)
    .eq("user_id", userId)
    .maybeSingle();

  return !!data;
}

export async function createGroup(params: {
  name: string;
  description: string;
  isPrivate: boolean;
  ownerId: string;
}) {
  const { data, error } = await supabase
    .from("groups")
    .insert({
      name: params.name,
      description: params.description || null,
      is_private: params.isPrivate,
      owner_id: params.ownerId,
    })
    .select()
    .single();

  return { data: data as Group | null, error: error?.message || null };
}

export async function joinGroup(groupId: string, userId: string) {
  const { error } = await supabase
    .from("group_members")
    .insert({ group_id: groupId, user_id: userId, role: "member" });

  return error ? error.message : null;
}

export async function leaveGroup(groupId: string, userId: string) {
  const { error } = await supabase
    .from("group_members")
    .delete()
    .eq("group_id", groupId)
    .eq("user_id", userId);

  return error ? error.message : null;
}

export async function listGroupMembers(groupId: string) {
  const { data } = await supabase
    .from("group_members")
    .select("*")
    .eq("group_id", groupId)
    .order("joined_at", { ascending: true });

  return (data || []) as GroupMember[];
}

export async function listGroupMessages(groupId: string) {
  const { data } = await supabase
    .from("group_messages")
    .select("*")
    .eq("group_id", groupId)
    .order("created_at", { ascending: true });

  return (data || []) as GroupMessage[];
}

export async function sendGroupMessage(
  groupId: string,
  userId: string,
  content: string
) {
  const { data, error } = await supabase
    .from("group_messages")
    .insert({ group_id: groupId, user_id: userId, content })
    .select()
    .single();

  return { data: data as GroupMessage | null, error: error?.message || null };
}
