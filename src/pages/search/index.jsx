import { useSearchParams, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import getListQuizByKeyword from '../../apis/quizServices/getListQuizByKeyword';

const SearchPage = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const [results, setResults] = useState();
    const q = searchParams.get('q');
    const sort = searchParams.get('sort') || 'name';
    const order = searchParams.get('order') || 'asc';
    const handleFilterChange = (e) => {
        const [sort, order] = e.target.value.split(':');
        const newParams = {
            ...Object.fromEntries(searchParams.entries()),
            sort,
            order,
        };

        setSearchParams(newParams);
    };
    useEffect(() => {
        const fetchData = async () => {
            console.log(q, sort, order);

            const response = await getListQuizByKeyword(q, sort, order);
            setResults(response);
        };
        fetchData();
    }, [q, sort, order]);
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
                    <option value="name:asc">Name: A-Z</option>
                    <option value="name:desc">Name: Z-A</option>
                    <option value="rating:asc">Rating: Lowest first</option>
                    <option value="rating:desc">Rating: Highest first</option>
                </select>
            </div>
            <div className="flex min-h-11 flex-col">
                {results &&
                    results.map((item) => (
                        <div
                            key={item.id}
                            className="flex gap-4 border-y-1 border-[#e4e3db] p-3"
                        >
                            <Link to={`/${item.id}`}>
                                <img
                                    src={
                                        item.media?.media_link ??
                                        '/public/image/test.jpg'
                                    }
                                    alt=""
                                    className="aspect-[3/2.5] h-28 cursor-pointer rounded-[5px]"
                                />
                            </Link>
                            <div className="flex flex-col justify-between">
                                <Link to={`/${item.id}`}>
                                    <div className="text-[1.4rem] font-bold hover:underline">
                                        {item.name}
                                    </div>
                                </Link>
                                <div className="flex gap-3">
                                    <div className="font-bold">
                                        Rating: {item.rating}
                                    </div>
                                    <div>
                                        Upload:{' '}
                                        {new Date(
                                            item.createdAt
                                        ).toLocaleDateString('vi-VN')}
                                    </div>
                                </div>
                                <div className="font-bold text-[#666562]">
                                    Created by: {item.createdBy.username}
                                </div>
                            </div>
                        </div>
                    ))}
            </div>
        </div>
    );
};
export default SearchPage;
