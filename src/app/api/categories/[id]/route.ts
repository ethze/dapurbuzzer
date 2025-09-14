import { supabase } from "@/lib/supabaseClient";
import { NextResponse } from "next/server";

type Params = { params: { id: string } };

// GET category by id
export async function GET(_: Request, { params }: Params) {
  const { id } = params;
  const { data, error } = await supabase
    .from("categories")
    .select("*")
    .eq("id", id)
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 404 });
  return NextResponse.json(data);
}

// UPDATE category
export async function PUT(req: Request, { params }: Params) {
  const { id } = params;
  const body = await req.json();

  const { data, error } = await supabase
    .from("categories")
    .update(body)
    .eq("id", id)
    .select()
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data);
}

// DELETE category
export async function DELETE(_: Request, { params }: Params) {
  const { id } = params;

  const { error } = await supabase.from("categories").delete().eq("id", id);
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ message: "Deleted successfully" });
}

