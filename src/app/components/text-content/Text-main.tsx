"use client";
import { useState } from "react";
import NewsCompetitionPost from "../posts/news-compeition/NewsCompetitionPost";
import TempelateOne from "../tempelates/TempelateOne";
import CalenderWithText from "../combined/CalenderWithText";
import { NewsPost, CompetitionPost } from "@/app/misc/types";

export default function TextMain() {
  const [posts, setPosts] = useState<(NewsPost | CompetitionPost)[]>();

  // props down events up principle
  const handlePostsUpdate = (selectedPosts: (NewsPost | CompetitionPost)[]) => {
    setPosts(selectedPosts);
  };

  return (
    <>
      <section className="flex-1 flex justify-center items-center max-w-[1300px] lg:rounded-2xl text-white mt-20 lg:mt-8 mb-16 mx-auto">
        <TempelateOne
          title="Kalender"
          text="Använd kalendern för att se uppkommande nyheter eller tävlingar.
                Inlägg om nyheter är färgkodade blå medans inlägg relaterade
                till uppkommande tävlingar är röda."
          component={<CalenderWithText onPostsUpdate={handlePostsUpdate} />}
        />
      </section>
      {posts !== undefined && posts?.length > 0 && (
        <div className="w-full  bg-black bg-opacity-30 lg:px-8 px-4 space-y-4 pb-8 slide-down">
          <h3 className="text-2xl text-center text-gray-400 py-10">Inlägg</h3>
          <div className="max-w-[1300px] mx-auto">
            {posts.map((post) => (
              <NewsCompetitionPost
                key={post.id}
                post={post}
                postType={post.postType}
              />
            ))}
          </div>
        </div>
      )}
    </>
  );
}
