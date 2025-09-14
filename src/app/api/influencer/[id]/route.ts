import { supabase } from "@/lib/supabaseClient";
import { NextResponse } from "next/server";

// GET influencer by id
export async function GET(_: Request, context: { params: { id: string } }) {
  const { id } = context.params;
  const { data, error } = await supabase
    .from("influencers")
    .select("*")
    .eq("id", id)
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 404 });
  return NextResponse.json(data);
}

// UPDATE influencer
export async function PUT(req: Request, context: { params: { id: string } }) {
  const { id } = context.params;
  const body = await req.json();

  const { data, error } = await supabase
    .from("influencers")
    .update(body)
    .eq("id", id)
    .select()
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data);
}

// DELETE influencer
export async function DELETE(_: Request, context: { params: { id: string } }) {
  const { id } = context.params;

  const { error } = await supabase.from("influencers").delete().eq("id", id);
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ message: "Deleted successfully" });
}

