import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { BsUpload, BsArrowLeftShort, BsArrowRightShort, BsX } from 'react-icons/bs';

import styles from './Product.module.css';

const PLACEHOLDER_IMG_SRC = '/placeholder.png';

function TextAreaField({ toggleEdit, title, snkrData, setSnkrData, valKey }) {
    if (!toggleEdit) return null;
    return <div className={styles.textarea_field}>
        <div className={styles.title}>{title}</div>
        <textarea
            className={styles.input}
            value={snkrData[valKey]}
            onChange={e => {
                let newSnkrData = { ...snkrData };
                newSnkrData[valKey] = e.target.value;
                setSnkrData(newSnkrData);
            }} />
    </div>
}
function InputField({ toggleEdit, title, snkrData, setSnkrData, valKey }) {
    if (!toggleEdit) return null;
    return <div className={styles.input_field}>
        <div className={styles.title}>{title}</div>
        <input
            className={styles.input}
            value={snkrData[valKey]}
            onChange={e => {
                let newSnkrData = { ...snkrData };
                newSnkrData[valKey] = e.target.value;
                setSnkrData(newSnkrData);
            }} />
    </div>
}

export default function Product({ isEdit, onChange }) {

    // excluding img data | for editing && product page
    const [sneakerData, setSneakerData] = useState({
        name: 'Fancy Sneakers',
        price: 0,
        sizesStr: '8.5/9/9.5/10/10.5/11',
        descBody: 'This section displays a description of the sneakers.',
        detailsBody: 'This sections offers the details of the sneakers.',
    });
    const [images, setImages] = useState([]); // for editing FILES
    const [imgPreviews, setImgPreviews] = useState([]);
    const [imgSrcList, setImgSrcList] = useState([]); // for product page

    useEffect(() => {
        if (!onChange || !isEdit) return;

        onChange({
            ...sneakerData,
            images,
        });
    }, [sneakerData, images]);

    const [slides, setSlides] = useState([]); // for editing && product page

    useEffect(() => { // for editing
        if (!isEdit) return;
        setSlides([...(isEdit ? images.map(img => URL.createObjectURL(img)) : imgSrcList), ...new Array(7)].slice(0, 7));
        console.log('images', images);

        return () => {
            for (var previewUrl of imgPreviews){
                URL.revokeObjectURL(previewUrl); // free memory when component is unmounted
            }
        }
    }, [imgPreviews]);
    useEffect(() => { // for editing
        setImgPreviews(images.map(img => URL.createObjectURL(img)));
    }, [images]);

    const [uploadEditMode, setUploadEditMode] = useState('move'); // modes: move, delete
    const handleImageUpload = e => {
        // const files = e.target.files;
        // const currImages = [...images];
        // for (let [i, file] of Object.entries(files)) {
        //     const reader = new FileReader();
        //     reader.readAsDataURL(file);

        //     reader.onload = () => {
        //         currImages.push({
        //             data: reader.result,
        //             name: file.name,
        //         });

        //         if (i >= files.length - 1) {
        //             // once done, set image list
        //             setImages(currImages);
        //             e.target.value = '';
        //         }
        //     }

        //     reader.onerror = err => console.log(err);

        //     console.log(`Image ${i}: `, file);
        // }
        if(!e.target.files || e.target.files.length === 0) return;
        let newImages = Object.values(e.target.files);
        setImages([...images, ...newImages]);
        console.log('newImages', newImages);
    }
    const handleDeleteImg = index => {
        let newImages = [...images];
        newImages.splice(index, 1);
        setImages(newImages);
    }
    const handleMoveImg = (index, dirVal) => {
        let nextIndex = index + dirVal;
        if (nextIndex < 0 || nextIndex > images.length - 1) return;

        let newImages = [...images];
        let temp = newImages[index + dirVal];
        newImages[index + dirVal] = newImages[index];
        newImages[index] = temp;

        console.log('newImages: ', newImages);
        setImages(newImages);
    }
    const [toggleDelete, setToggleDelete] = useState(false);
    const handleToggleDelete = e => {
        setToggleDelete(!toggleDelete);
    }

    const [toggleEdit, setToggleEdit] = useState(isEdit);
    const handleToggleEdit = e => {
        setToggleEdit(!toggleEdit);
    }

    const handleAddToCart = e => {
        console.log('add to cart');
    }

    return (
        <div className={styles.wrapper}>

            <div className={styles.slideshow}>
                <div className={styles.current_slide}>
                    <Image
                        loading='lazy'
                        layout='fill'
                        src={slides[0] || PLACEHOLDER_IMG_SRC}
                        className={styles.img}
                        alt={`Hero Slide`} />
                </div>
                <div className={styles.slides}>
                    {
                        [...slides].slice(1, slides.length).map((src, i) => {
                            return <div className={styles.slide} key={i.toString()}>
                                <Image
                                    loading='lazy'
                                    layout='fill'
                                    src={src || PLACEHOLDER_IMG_SRC}
                                    className={styles.img}
                                    alt={`Slide ${i + 1}`} />
                            </div>
                        })
                    }
                </div>
                {
                    isEdit &&
                    <>
                        <br /><br />
                        <div className={styles.img_upload}>
                            <div className={styles.title}>Images Uploaded: {images.length}/7</div>
                            <button className={styles.delete_toggle} onClick={handleToggleDelete}>TOGGLE DELETE: {toggleDelete ? 'ON' : 'OFF'}</button>
                            <div className={styles.uploads}>
                                {
                                    [...new Array(7)].map((_, i) => {
                                        if (i == images.length) { // upload
                                            return <div className={`${styles.box} ${styles.upload}`} key={i.toString()}>
                                                <label
                                                    htmlFor='img-upload'
                                                    className={styles.label}
                                                    title='Click to upload image'>
                                                    <BsUpload className={styles.icon} />
                                                </label>
                                                <input
                                                    style={{ display: 'none' }}
                                                    type='file'
                                                    id='img-upload'
                                                    accept="image/png, image/jpeg"
                                                    multiple
                                                    onChange={handleImageUpload} />
                                            </div>
                                        }
                                        else if (i > images.length) { //blank
                                            return <div className={`${styles.box} ${styles.blank}`} key={i.toString()}></div>
                                        }
                                        else { // image
                                            const url = imgPreviews[i];
                                            return <div className={`${styles.box} ${styles.img}`} key={i.toString()}>
                                                <Image
                                                    loading='lazy'
                                                    src={url}
                                                    layout='fill'
                                                    className={styles.img}
                                                    alt={`Image Upload ${i + 1}`} />
                                                {
                                                    toggleDelete ?
                                                        <div className={styles.delete} onClick={e => handleDeleteImg(i)}>
                                                            <BsX className={styles.icon}/>
                                                        </div>
                                                    :
                                                        <div className={styles.controls}>
                                                            <div className={styles.left} onClick={e => handleMoveImg(i, -1)}>
                                                                <BsArrowLeftShort className={styles.icon} />
                                                            </div>
                                                            <div className={styles.right} onClick={e => handleMoveImg(i, 1)}>
                                                                <BsArrowRightShort className={styles.icon} />
                                                            </div>
                                                        </div>
                                                }
                                            </div>
                                        }
                                    })
                                }
                            </div>
                        </div>
                    </>
                }
            </div>

            <div className={styles.specifics}>

                <div className={styles.name}>{sneakerData.name}</div>
                <TextAreaField title={'Sneaker Name'} valKey={'name'} toggleEdit={toggleEdit} snkrData={sneakerData} setSnkrData={setSneakerData} />
                <br />

                <div className={styles.price}>${sneakerData.price || 'null'}</div>
                <InputField title={'Price'} valKey={'price'} toggleEdit={toggleEdit} snkrData={sneakerData} setSnkrData={setSneakerData} />
                <br /><br />

                <div className={styles.sizes}>
                    <div className={styles.title}>Sizes</div>
                    <div className={styles.options}>
                        {
                            sneakerData.sizesStr.split('/').map((sizeVal, i) => {
                                return <div className={styles.size} key={i.toString()}>
                                    US {sizeVal}
                                </div>
                            })
                        }
                    </div>
                </div>
                <TextAreaField title={'Sizes'} valKey={'sizesStr'} toggleEdit={toggleEdit} snkrData={sneakerData} setSnkrData={setSneakerData} />
                <br /><br />

                <div className={styles.actions}>
                    <button className={styles.addToCart} onClick={handleAddToCart}>ADD TO CART</button>
                </div>
                <br /><br />

                <div className={styles.description}>{sneakerData.descBody}</div>
                <TextAreaField title={'Description'} valKey={'descBody'} toggleEdit={toggleEdit} snkrData={sneakerData} setSnkrData={setSneakerData} />
                <br /><br />

                <div className={styles.details}>{sneakerData.detailsBody}</div>
                <TextAreaField title={'Details'} valKey={'detailsBody'} toggleEdit={toggleEdit} snkrData={sneakerData} setSnkrData={setSneakerData} />
                <br /><br />

                {
                    isEdit &&
                    <button className={styles.edit_toggle} onClick={handleToggleEdit}>
                        TOGGLE EDIT: {toggleEdit ? 'EDITING' : 'PREVIEW'} MODE
                    </button>
                }
            </div>
        </div>
    )
}