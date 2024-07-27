"use server";
export const fetchModelList = async () => {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_URL}/v1/models`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_SECRET_TOKEN}`,
      },
    });
    const data = await response.json();
    return data;
  } catch (e) {
    console.log(e);
    throw new Error("Failed to fetch data");
  }
};
