import { supabase } from "@/lib/supabaseClient";
import { NextResponse } from "next/server";

// GET all categories
export async function GET() {
  const { data, error } = await supabase.from("categories").select("*");
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data);
}

// POST new category
export async function POST(req: Request) {
  const body = await req.json();
  const { name } = body;

  const { data, error } = await supabase
    .from("categories")
    .insert([{ name }])
    .select();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data[0]);
}

