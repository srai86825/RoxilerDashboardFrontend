import {
  BarChart,
  Nav,
  PieChart,
  Statistics,
  Transactions,
} from "@/components";

const Home = () => {
  return (
    <div className="flex flex-col max-w-full min-w-full">
      <Nav />
      <div className="min-w-full pt-12" style={{ backgroundColor: "#e6e2de" }}>
        <div className="mx-28 my-10">
          <div className="flex md:flex-row sm:flex-col justify-between mb-20 ">
            <Statistics />
            <PieChart />
          </div>
          <BarChart />
        </div>
      </div>
      <Transactions />
      <div>
        <p className="flex justify-center m-5">
          Made with ❤️ by <a className="heading-color pl-2" href="https://saurabh-rai.vercel.app/">
            Saurabh
          </a>
          !
        </p>
      </div>
    </div>
  );
};

export default Home;
