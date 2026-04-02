"use client";

import Image from "next/image";
import posthog from "posthog-js";

const ExploreBtn = () => {
    return (
        <button
            type={'button'}
            onClick={() => { posthog.capture('explore_events_clicked'); }}
            className={'mt-7 ax-auto '}
            id={'explore-btn'}
        >
            <a href={'#events'}> Explore Events
                <Image src={"/icons/arrow-down.svg"} alt={"Arrow Down"} width={24} height={24} />
            </a>
        </button>
    )
}
export default ExploreBtn
