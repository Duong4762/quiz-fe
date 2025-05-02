import { useSearchParams } from 'react-router-dom';
import { useEffect } from 'react';

const SearchPage = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const results = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    const q = searchParams.get('q');
    const sort = searchParams.get('sort');
    const order = searchParams.get('order');
    const handleFilterChange = (e) => {
        const [sort, order] = e.target.value.split(':');
        const newParams = {
            ...Object.fromEntries(searchParams.entries()),
            sort,
            order,
        };

        setSearchParams(newParams);
    };
    useEffect(() => {}, [q, sort, order]);
    return (
        <div className="container min-h-screen max-md:px-3.5">
            <div className="text-2xl font-bold max-md:text-[1.2rem]">
                Showing results for "{q}"
            </div>
            <div className="relative my-4 h-10 w-64">
                <div className="absolute z-0 h-full w-full rounded-[8px] bg-[#e4e3db]"></div>
                <select
                    className="absolute z-10 h-full w-full font-bold focus:outline-none"
                    onChange={handleFilterChange}
                >
                    <option value="name:asc">Option 1</option>
                    <option value="name:desc">Option 2</option>
                    <option value="rating:asc">Option 3</option>
                    <option value="rating:desc">Option 4</option>
                </select>
            </div>
            <div className="flex min-h-11 flex-col">
                {results.map((item, index) => {
                    return (
                        <div className="flex gap-4 border-y-1 border-[#e4e3db] p-3">
                            <img
                                src="/public/image/test.jpg"
                                alt=""
                                className="aspect-[3/2.5] h-28 cursor-pointer rounded-[5px]"
                            />
                            <div className="flex flex-col">
                                <div className="text-[1.2rem] font-bold hover:underline">
                                    name
                                </div>
                                <div className="flex gap-3">
                                    <div className="font-bold">4.8</div>
                                    <div>Number of question</div>
                                    <div>Upload date</div>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};
export default SearchPage;
