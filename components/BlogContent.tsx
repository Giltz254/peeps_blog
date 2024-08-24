import Image from "next/image";
import CopyButton from "@/components/frontend/CopyToClipBoard";

const Img = ({ url, caption }: { url: string; caption: string }) => {
  return (
    <div>
      <div className="relative h-64 w-full bg-muted-foreground border border-border overflow-hidden">
        <Image src={url} alt="image" fill className="object-cover" sizes="(max-width: 991px) 100vw, (max-width: 1200px) 50vw, 33vw" />
      </div>
      {caption.length > 0 && (
        <p className="w-full text-center my-3 md:mb-12 text-base text-dark-grey">
          {caption}
        </p>
      )}
    </div>
  );
};

const Quote = ({ quote, caption }: { quote: string; caption: string }) => {
  return (
    <div className="bg-muted rounded-md p-6 border-l-4 border-primary">
      <p className="text-lg leading-7 font-normal text-black">
        {quote}
      </p>
      {caption.length > 0 && (
        <p className="mt-3 text-dark text-sm md:text-base italic text-right">
          {caption}
        </p>
      )}
    </div>
  );
};

const List = ({ style, items }: { style: any; items: any }) => {
  return (
    <ol
      className={`pl-5 ${style === "ordered" ? "list-decimal" : "list-disc"}`}
    >
      {items.map((listitem: any, i: number) => (
        <li
          key={i}
          className="my-4"
          dangerouslySetInnerHTML={{ __html: listitem }}
        ></li>
      ))}
    </ol>
  );
};

const Code = ({ code }: { code: string }) => {
  return (
    <pre className="bg-white border relative border-border drop-shadow-sm p-4 xl:max-w-[calc(100vw-678px)] lg:max-w-[calc(100vw-300px)] max-w-full overflow-x-auto ">
      <div className="absolute right-0 top-0 mt-1 mr-1">
        <CopyButton text={code} />
      </div>
      <code className="text-secondary-foreground text-base font-normal" dangerouslySetInnerHTML={{ __html: code }}></code>
    </pre>
  );
};
const Table = ({
  headers = [],
  rows = [],
}: {
  headers?: string[];
  rows?: string[][];
}) => {
  return (
    <div className="overflow-x-auto max-w-full xl:max-w-[calc(100vw-678px)]">
      <table className="min-w-full border border-border">
        <thead>
          <tr className="">
            {headers.length > 0 ? (
              headers.map((header, index) => (
                <th
                  key={index}
                  className="px-4 py-2 border-b border-r border-border text-secondary-foreground text-base bg-muted font-semibold capitalize"
                >
                  {header}
                </th>
              ))
            ) : (
              <th className="px-4 py-2 border-b">No Headers</th>
            )}
          </tr>
        </thead>
        <tbody>
          {rows.length > 0 ? (
            rows.map((row, rowIndex) => (
              <tr key={rowIndex} className="hover:bg-muted transition-colors duration-300">
                {row.map((cell, cellIndex) => (
                  <td
                    key={cellIndex}
                    className="px-4 py-2 border-r border-border text-base text-dark font-normal border-b"
                    dangerouslySetInnerHTML={{ __html: cell }} // Use dangerouslySetInnerHTML here
                  ></td>
                ))}
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={headers.length} className="px-4 py-2 text-center">
                No Data
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

const BlogContent = ({ blog }: { blog: any }) => {
  let { type, data } = blog;

  if (type === "paragraph") {
    return (
      <p
        className="text-lg text-black font-normal text-justify"
        dangerouslySetInnerHTML={{ __html: data.text }}
      ></p>
    );
  }
  if (type === "header") {
    const headers = [
      "text-2xl first-letter:capitalize font-bold",
      "text-xl first-letter:capitalize font-bold",
      "text-lg first-letter:capitalize font-bold",
      "text-base first-letter:capitalize font-bold",
      "text-base first-letter:capitalize font-bold",
      "text-sm first-letter:capitalize font-bold",
    ];
    const HeaderTag = `h${data.level}` as keyof JSX.IntrinsicElements;
    return (
      <HeaderTag
        className={headers[data.level - 1]}
        dangerouslySetInnerHTML={{ __html: data.text }}
      ></HeaderTag>
    );
  }
  if (type === "image") {
    return <Img url={data.file.url} caption={data.caption} />;
  }
  if (type === "quote") {
    return <Quote quote={data.text} caption={data.caption} />;
  }
  if (type === "list") {
    return <List style={data.style} items={data.items} />;
  }
  if (type === "code") {
    return <Code code={data.code} />;
  }
  if (type === "table") {
    const [headers, ...rows] = data.content;
    return <Table headers={headers} rows={rows} />;
  }

  return <h1>Hello</h1>;
};

export default BlogContent;
