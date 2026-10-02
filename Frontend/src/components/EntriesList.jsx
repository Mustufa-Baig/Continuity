import { useEffect } from "react";
import { useLocation } from "react-router-dom";

function ScrollToHash() {
  const { hash } = useLocation();

  useEffect(() => {
    if (!hash) return;

    const id = decodeURIComponent(hash.slice(1));

    // Wait until the notes have rendered
    requestAnimationFrame(() => {
      const element = document.getElementById(id);

      element?.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    });
  }, [hash]);

  return null;
}

const EntriesList = ({ entries }) => {
  return(
    <>
    <ScrollToHash />
    <div className="grid w-full grid-cols-1 gap-1 font-grotesk sm:grid-cols-2 lg:grid-cols-3">
      {entries.map((entry) => (
        <div
          key={entry.id}
          id={entry.id}
          className="flex w-full min-w-0 flex-col overflow-hidden rounded-sm p-2 bg-neutral-800"
        >
          <div className="flex justify-between items-center gap-2 min-w-0">
            <h2 className="w-[60%] block min-w-0 p-1 pl-3 rounded-xs truncate text-xl italic bg-neutral-100">
              {entry.project.title}
            </h2>
            <h3 className="min-w-0 m-2 max-w-full break-words text-neutral-500 font-thin">{entry.user.username}</h3>
          </div>

          <p className="min-w-0 px-1 my-1 max-w-full whitespace-pre-wrap break-words flex-1 font-thin text-neutral-400">
            {entry.content}
          </p>

          <p className="min-w-0 max-w-full break-words ml-1 mt-1 text-neutral-500">
            {new Date(entry.createdAt).toLocaleString()}
          </p>
        </div>
      ))}
    </div>
    </>
  )
}

export default EntriesList