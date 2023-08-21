"use client";
import Image from "next/image";
import { useState } from "react";
import useSWR from "swr";

export default function Home() {
  const fetcher = (...args) => fetch(args).then((res) => res.json());
  const { data, isLoading, mutate } = useSWR("/api/hello", fetcher);

  const [taskimg, settaskimg] = useState("");
  const [taskname, settaskname] = useState("");

  if (isLoading) return <p>loading...</p>;

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formdata = new FormData();
      formdata.set("taskimg", taskimg);
      formdata.set("taskname", taskname);

      await fetch("/api/hello", {
        method: "POST",
        body: formdata,
      });

      mutate();
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <div>
        {data &&
          data?.map((d) => (
            <div className="relative w-[100px] h-[100px]" key={d?.id}>
              <Image alt={d?.taskname} src={`/${d?.taskimg}`} className="object-contain" fill priority />
            </div>
          ))}
      </div>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="taskname"
          placeholder="task name..."
          onChange={(e) => settaskname(e.target.value)}
        />
        <input
          type="file"
          name="taskimg"
          onChange={(e) => settaskimg(e.target.files[0])}
        />

        <button>submit</button>
      </form>
    </div>
  );
}
