import { EditPageContext } from '../../../layouts/EditPageLayout';
import { useContext } from 'react';

const EditQuizArea = () => {
    const { data, setData } = useContext(EditPageContext);
    const allTags = [
        { id: 1, tag: 'Art & Literature' },
        { id: 2, tag: 'Entertainment' },
        { id: 3, tag: 'Geography' },
        { id: 4, tag: 'History' },
        { id: 5, tag: 'Languages' },
        { id: 6, tag: 'Science & Nature' },
        { id: 7, tag: 'Sports' },
        { id: 8, tag: 'Trivia' },
    ];

    const handleChangeInput = (e) => {
        const { name, value } = e.target;
        setData({ ...data, [name]: value });
    };

    const toggleTag = (id) => {
        const currentTags = data.tag_ids;
        const newTags = currentTags.includes(id)
            ? currentTags.filter((t) => t !== id) // Nếu tag đã được chọn, thì bỏ chọn
            : [...currentTags, id]; // Nếu tag chưa được chọn, thì chọn

        setData({ ...data, tag_ids: newTags });
    };

    return (
        <div className="flex w-full flex-col gap-6 rounded-[10px] bg-[#23616a] p-4">
            <div className="flex flex-col">
                <div className="font-bold text-white">
                    <span className="rounded-t-md bg-cyan-400 px-3 py-2">
                        Quiz name
                    </span>
                </div>
                <div className="rounded-tr-xl rounded-b-xl bg-cyan-400 p-1">
                    <input
                        type="text"
                        className="w-full rounded-xl bg-white p-3 font-medium text-black hover:bg-amber-50 focus:bg-white focus:outline-none"
                        name="name"
                        value={data.name}
                        onChange={handleChangeInput}
                    />
                </div>
            </div>
            <div className="flex flex-col">
                <div className="font-bold text-white">
                    <span className="rounded-t-md bg-[#19444a] px-3 py-2">
                        Description
                    </span>
                </div>
                <div className="rounded-tr-xl rounded-b-xl bg-[#19444a] p-1">
                    <textarea
                        name="description"
                        className="w-full rounded-xl bg-white p-3 font-medium text-black hover:bg-amber-50 focus:bg-white focus:outline-none"
                        value={data.description}
                        onChange={handleChangeInput}
                    ></textarea>
                </div>
            </div>
            <div className="flex flex-col">
                <div className="font-bold text-white">
                    <span className="rounded-t-md bg-[#19444a] px-3 py-2">
                        Tag
                    </span>
                </div>
                <div className="rounded-tr-xl rounded-b-xl bg-[#19444a] p-4">
                    <div className="grid grid-cols-2 gap-2 font-bold">
                        {allTags.map((item) => (
                            <label
                                key={item.id}
                                className="flex items-center gap-2 text-white"
                            >
                                <input
                                    type="checkbox"
                                    checked={data.tag_ids?.includes(item.id)}
                                    onChange={() => toggleTag(item.id)}
                                    className="hover:scale-[1.2]"
                                />
                                {item.tag}
                            </label>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};
export default EditQuizArea;
