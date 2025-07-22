// https://github.com/karansuryawanshi/youtube_clone

// Import necessary dependencies
import { Dot } from "lucide-react";

// Dummy data array containing video suggestions

const dummyData = [
  {
    thumbnail:
      "https://i.ytimg.com/vi/Y1J9_9-vNcU/hqdefault.jpg?sqp=-oaymwEnCNACELwBSFryq4qpAxkIARUAAIhCGAHYAQHiAQoIGBACGAY4AUAB&rs=AOn4CLAvlGqjh19grGmCslzUsFq4XvrB4A",
    title:
      "India Claim Thrilling Win! | England v India - Day 5 Highlights | 2nd LV= Insurance Test 2021",
    channelName: "England & whales cricket",
    views: "57M",
    uploaded: "3 years",
  },
  {
    thumbnail:
      "https://i.ytimg.com/vi/KdWPGqT5GwE/hqdefault.jpg?sqp=-oaymwEnCNACELwBSFryq4qpAxkIARUAAIhCGAHYAQHiAQoIGBACGAY4AUAB&rs=AOn4CLCPJY1gX1djgrLJtWd75Mrkr3gaUQ",
    title: "Mastering HTML Tags for Web Development || Episode - 5",
    channelName: "CodeHelp - by Babbar",
    views: "596K",
    uploaded: "2 years",
  },
  {
    thumbnail:
      "https://i.ytimg.com/vi/JgDNFQ2RaLQ/hqdefault.jpg?sqp=-oaymwEnCNACELwBSFryq4qpAxkIARUAAIhCGAHYAQHiAQoIGBACGAY4AUAB&rs=AOn4CLAfepbadY1CtatUH_d22OgkC1Q4-g",
    title: "Ed Sheeran - Sapphire (Official Music Video)",
    channelName: "Ed Sheeran",
    views: "47M",
    uploaded: "12 days",
  },
  {
    thumbnail:
      "https://i.ytimg.com/vi/4IOJW5-n0_8/hqdefault.jpg?sqp=-oaymwEnCNACELwBSFryq4qpAxkIARUAAIhCGAHYAQHiAQoIGBACGAY4AUAB&rs=AOn4CLCCfSumHiembyTsmMum94bS7NSxjA",
    title: "Fake Podcast with Pakistani General | जनाब मक़सद",
    channelName: "satish ray",
    views: "4.5M",
    uploaded: "1 month",
  },
  {
    thumbnail:
      "https://i.ytimg.com/vi/1gukvtH_a3I/hqdefault.jpg?sqp=-oaymwFBCNACELwBSFryq4qpAzMIARUAAIhCGAHYAQHiAQoIGBACGAY4AUAB8AEB-AH-CYAC0AWKAgwIABABGBsgTSh_MA8=&rs=AOn4CLC3ZDnb8cs0SeF0QE2hAzMi4gOJwA",
    title:
      "Chaudhary - Amit Trivedi feat Mame Khan, Coke Studio @ MTV Season 2",
    channelName: "Coke Studio India ",
    views: "111M",
    uploaded: "12 years",
  },
  {
    thumbnail:
      "https://i.ytimg.com/vi/ZDW94jpG-L4/hqdefault.jpg?sqp=-oaymwEnCNACELwBSFryq4qpAxkIARUAAIhCGAHYAQHiAQoIGBACGAY4AUAB&rs=AOn4CLCF7oZEFxXeTWON3lr9jGOPzQ6bIw",
    title:
      "Foreign Secretary Vikram Misri on India-Canada Reset, Envoys to Return",
    channelName: "NewX Live",
    views: "140M",
    uploaded: "2 hours",
  },
];

const DummySuggession = () => {
  return (
    <>
      {/* Responsive grid layout for suggestions */}
      <section className="grid grid-cols-1 gap-4 lg:grid-cols-2 xl:grid-cols-1">
        {dummyData.map((item, index) => {
          // Rendering each suggestion as an article
          return (
            <article className="flex flex-col sm:flex-row" key={index}>
              {/* Thumbnail image */}
              <img
                className="w-[17rem] h-[6rem] mr-2 rounded-lg"
                src={item.thumbnail}
                alt={item.title}
              />

              {/* Video details */}
              <div className="text-sm">
                {/* Display title with ellipsis if too long */}
                {item.title.length > 52 ? (
                  <p className="mb-1">{item?.title.slice(0, 45)}...</p>
                ) : (
                  <p className="mb-1">{item?.title}</p>
                )}

                {/* Channel name */}
                <p className="mb-1 text-neutral-600 hover:text-neutral-800 duration-300 cursor-pointer">
                  {item?.channelName}
                </p>

                {/* Views and uploaded time */}
                <div className="flex">
                  <span className="text-neutral-600">{item.views} Views</span>
                  <span>
                    <Dot className="text-neutral-600" />
                  </span>
                  <span className="text-neutral-600">{item.uploaded} ago</span>
                </div>
              </div>
            </article>
          );
        })}
      </section>
    </>
  );
};

export default DummySuggession;
