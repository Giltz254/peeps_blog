import Card from "./AboutCard";
import MailTemplate from "./MailTemplate";
import Newsletter from "./Newsletter";
const Aside = () => {
  return (
    <div
      id="side"
      className="lg:w-[300px] max-lg:border-0 h-[calc(100vh-64px)] max-lg:fixed lg:sticky max-lg:pt-16  left-0 top-16 px-4 bg-white border-r flex flex-col gap-y-4 overflow-y-auto child pb-8"
    >
      <MailTemplate />
      <Newsletter />
      <Card />
    </div>
  );
};

export default Aside;
