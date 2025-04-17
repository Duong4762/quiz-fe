import { useRef, useState, useEffect, useContext } from 'react';
import { EditPageContext } from '../../../layouts/EditPageLayout';

const EditImageArea = () => {
    const { data, setData, currentSlide } = useContext(EditPageContext);
    const fileInputRef = useRef();
    const [previewUrl, setPreviewUrl] = useState(null);
    const [zoom, setZoom] = useState(1);
    const [offset, setOffset] = useState({ x: 0, y: 0 });
    const [dragging, setDragging] = useState(false);
    const [startPos, setStartPos] = useState({ x: 0, y: 0 });

    const handleZoomIn = () => {
        setZoom((prev) => Math.min(prev + 0.1, 3));
    };

    const handleZoomOut = () => {
        setZoom((prev) => Math.max(prev - 0.1, 0.2));
    };

    const handleClick = () => {
        fileInputRef.current.click();
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const imageUrl = URL.createObjectURL(file);
            setPreviewUrl(imageUrl);
            if (currentSlide === 'settings') {
                setData({ ...data, media_link: file });
            } else {
                const questions = [...data.questions];
                const question = {
                    ...questions[currentSlide],
                    media_link: file,
                };
                questions[currentSlide] = question;
                setData({ ...data, questions: questions });
            }
        }
    };

    const handleDeleteImage = () => {
        if (currentSlide === 'settings') {
            setData({ ...data, media_link: null });
        } else {
            const questions = [...data.questions];
            const question = {
                ...questions[currentSlide],
                media_link: null,
            };
            questions[currentSlide] = question;
            setData({ ...data, questions: questions });
        }
    };

    useEffect(() => {
        let media = null;
        if (currentSlide === 'settings') {
            media = data.media_link;
        } else {
            media = data.questions[currentSlide].media_link;
        }
        if (typeof media === 'string') {
            setPreviewUrl(media);
        } else if (media instanceof File) {
            const imageUrl = URL.createObjectURL(media);
            setPreviewUrl(imageUrl);
        } else {
            setPreviewUrl(null);
        }
    }, [currentSlide, data]);

    useEffect(() => {
        return () => {
            if (previewUrl) {
                URL.revokeObjectURL(previewUrl);
            }
        };
    }, [previewUrl]);

    return (
        <div className="flex w-full items-center justify-center rounded-[10px] bg-[#574a62] px-6 py-4 md:min-h-[500px]">
            <input
                type="file"
                accept="image/*"
                ref={fileInputRef}
                onChange={handleFileChange}
                className="hidden"
            />
            {previewUrl ? (
                <div className="w-full">
                    <div className="flex w-full gap-6 pb-4">
                        <img
                            src="/public/image/trashCanIcon.svg"
                            alt="Logo"
                            className="min-w-0 flex-shrink cursor-pointer rounded-[8px] bg-[#3d3444] p-3 hover:bg-[#645d69]"
                            onClick={handleDeleteImage}
                        />
                        <img
                            src="/public/image/zoomInIcon.svg"
                            alt="Logo"
                            className="min-w-0 flex-shrink cursor-pointer rounded-[8px] bg-[#3d3444] p-3 hover:bg-[#645d69]"
                            onClick={handleZoomIn}
                        />
                        <img
                            src="/public/image/zoomOutIcon.svg"
                            alt="Logo"
                            className="min-w-0 flex-shrink cursor-pointer rounded-[8px] bg-[#3d3444] p-3 hover:bg-[#645d69]"
                            onClick={handleZoomOut}
                        />
                        <div className="flex flex-1 justify-end font-bold text-white">
                            <div
                                className="flex cursor-pointer rounded-[8px] bg-[#3d3444] p-3 hover:bg-[#645d69]"
                                onClick={handleClick}
                            >
                                Replace
                            </div>
                        </div>
                    </div>
                    <div className="aspect-[3/2.5] w-full overflow-hidden p-8 py-14">
                        <img
                            src={previewUrl}
                            alt="Preview"
                            className="z-0 h-full w-full rounded-[10px] object-contain"
                            style={{
                                transform: `scale(${zoom}) translate(${offset.x}px, ${offset.y}px)`,
                            }}
                            onMouseDown={(e) => {
                                setDragging(true);
                                setStartPos({ x: e.clientX, y: e.clientY });
                            }}
                            onMouseMove={(e) => {
                                if (!dragging) return;
                                const dx = e.clientX - startPos.x;
                                const dy = e.clientY - startPos.y;
                                setStartPos({ x: e.clientX, y: e.clientY });
                                setOffset((prev) => ({
                                    x: prev.x + dx,
                                    y: prev.y + dy,
                                }));
                            }}
                            onMouseUp={() => setDragging(false)}
                            onMouseLeave={() => setDragging(false)}
                            onDragStart={(e) => e.preventDefault()}
                        />
                    </div>
                </div>
            ) : (
                <div
                    className="cursor-pointer rounded-[10px] bg-[#906791] px-16 py-4 font-bold text-white shadow-[0_4px_0px_rgba(0,0,0,0.4)] transition hover:bg-[#a685a7] active:translate-y-[4px] active:shadow-none"
                    onClick={handleClick}
                >
                    Add media
                </div>
            )}
        </div>
    );
};
export default EditImageArea;
