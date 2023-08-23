import Image from "next/image";
import NextLink from "next/link";
import { Link } from "@chakra-ui/react";

import Avator from "@/assets/avator.png";

import Chart from "../../components/Chart";
import Reveal from "../../components/Reveal";

export default function Home() {
  return (
    <div className="page-wrap outline-none">
      <header className="header">
        <Link href="https://twitter.com/Dean_Okk" isExternal as={NextLink}>
          <Image
            src={Avator}
            alt="TInkle"
            width={25}
            height={25}
            style={{ borderRadius: "50%" }}
          />
        </Link>
        <div>
          <Link href="https://twitter.com/Dean_Okk" isExternal as={NextLink}>
            @Dean
          </Link>
        </div>
      </header>
      <div className="chart-area">
        <div className="chart-content">
          <header className="chart-header">BTC</header>
          <Chart />
        </div>
        <Reveal />
      </div>
    </div>
  );
}
