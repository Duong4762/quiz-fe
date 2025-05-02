import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { StarIcon } from '../../../assets/icon';
import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch';

const ListQuiz = ({ filter, list }) => {
    const sliderRef = useRef(null);
    const scrollLeft = () => {
        if (sliderRef.current) {
            const sliderWidth = sliderRef.current.clientWidth;
            sliderRef.current.scrollBy({
                left: -sliderWidth,
                behavior: 'smooth',
            });
        }
    };

    const scrollRight = () => {
        if (sliderRef.current) {
            const sliderWidth = sliderRef.current.clientWidth;
            sliderRef.current.scrollBy({
                left: sliderWidth,
                behavior: 'smooth',
            });
        }
    };
    return (
        <div className="font-bold">
            <div className="py-2 text-2xl">{filter}</div>
            <div className="relative w-full overflow-hidden">
                <button
                    className="absolute top-[37%] left-0 z-5 aspect-square h-[37%] -translate-y-1/2 rounded-full bg-white text-[1rem] text-black opacity-75 shadow-md hover:opacity-100"
                    onClick={scrollLeft}
                >
                    ◀
                </button>
                <div
                    className="hidden-scrollbar flex overflow-x-auto"
                    ref={sliderRef}
                >
                    {list &&
                        list.map((item) => (
                            <div
                                key={item.id}
                                className="relative flex h-48 w-1/6 flex-shrink-0 flex-col rounded-2xl px-3 max-md:h-32 max-md:w-1/3 max-md:px-1"
                            >
                                <div className="group relative aspect-[3/2.5] w-full overflow-hidden rounded-2xl">
                                    <img
                                        src={
                                            item?.media?.media_link ||
                                            '/image/test.jpg'
                                        }
                                        alt=""
                                        className="h-full w-full object-cover"
                                    />
                                    <div className="absolute h-full w-full rounded-2xl bg-gray-800 opacity-0 transition-opacity duration-200 group-hover:opacity-40"></div>
                                    <div className="absolute top-[50%] left-[50%] flex h-[35%] translate-x-[-50%] translate-y-[-50%] cursor-pointer items-center justify-center rounded-full border-3 bg-[#ffdfb6] p-4 text-center text-[90%] whitespace-nowrap opacity-0 transition-opacity duration-200 group-hover:opacity-100 hover:bg-[#ffc679] max-md:w-[80%]">
                                        <div>Play Now</div>
                                    </div>
                                </div>
                                <Link to={`/${item.id}`}>
                                    <div className="cursor-pointer truncate pt-1 hover:underline">
                                        {item.name}
                                    </div>
                                </Link>
                                <div className="flex text-[0.8rem]">
                                    <div className="flex items-center truncate text-[#df7921]">
                                        {item.rating ? item.rating : '5'}
                                        <StarIcon className="h-[0.8rem] w-[0.8rem] fill-[#df7921]" />
                                    </div>
                                    <div className="ml-2 cursor-pointer truncate text-[#666562] hover:underline">
                                        By {item.createdBy.username}
                                    </div>
                                </div>
                            </div>
                        ))}
                </div>
                <button
                    className="absolute top-[37%] right-0 z-5 aspect-square h-[37%] -translate-y-1/2 rounded-full bg-amber-50 text-[1rem] text-black opacity-75 shadow-md hover:opacity-100"
                    onClick={scrollRight}
                >
                    ▶
                </button>
            </div>
        </div>
    );
};
export default ListQuiz;
