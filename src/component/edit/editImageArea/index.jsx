import { useRef, useState, useEffect, useContext } from 'react';
import { EditPageContext } from '../../../layouts/EditPageLayout';
import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch';

const EditImageArea = () => {
    const { data, setData, currentSlide } = useContext(EditPageContext);
    const fileInputRef = useRef();

    const getMedia = () => {
        if (currentSlide === 'settings') {
            return data.media;
        }
        return data.questions[currentSlide].media;
    };

    const updateMedia = (newMedia) => {
        if (currentSlide === 'settings') {
            setData({ ...data, media: newMedia });
        } else {
            const questions = [...data.questions];
            const question = {
                ...questions[currentSlide],
                media: newMedia,
            };
            questions[currentSlide] = question;
            setData({ ...data, questions });
        }
        console.log(data);
    };

    const handleClick = () => {
        fileInputRef.current.click();
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const media = getMedia();
            updateMedia({ ...media, media_link: file });
        }
    };

    const handleDeleteImage = () => {
        updateMedia(null);
    };

    const media = getMedia();
    const previewUrl =
        typeof media?.media_link === 'string'
            ? media.media_link
            : media?.media_link
              ? URL.createObjectURL(media.media_link)
              : null;

    useEffect(() => {
        return () => {
            if (previewUrl && typeof media?.media_link !== 'string') {
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
                        <div className="flex flex-1 justify-end font-bold text-white">
                            <div
                                className="flex cursor-pointer rounded-[8px] bg-[#3d3444] p-3 hover:bg-[#645d69]"
                                onClick={handleClick}
                            >
                                Replace
                            </div>
                        </div>
                    </div>
                    <div className="image-container relative aspect-[3/2.5] h-full w-full overflow-hidden rounded-[10px]">
                        <img
                            src={previewUrl}
                            alt="Preview"
                            className="h-full w-full object-cover"
                            draggable={false}
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
