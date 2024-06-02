import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { BsUpload, BsArrowLeftShort, BsArrowRightShort } from 'react-icons/bs';

import styles from './Product.module.css';

const PLACEHOLDER_IMG_SRC = '/placeholder.png';

function EditField({toggleEdit, title, snkrData, setSnkrData, valKey}){
    if(!toggleEdit) return null;
    return <div className={styles.edit_field}>
        <div className={styles.title}>{title}</div>
        <input 
            className={styles.input}
            type='text'
            value={snkrData[valKey]}
            onChange={e => {
                let newSnkrData = {...snkrData};
                newSnkrData[valKey] = e.target.value;
                setSnkrData(newSnkrData);
            }}/>
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
    const [images, setImages] = useState([]); // for editing
    const [imgSrcList, setImgSrcList] = useState([]); // for product page

    useEffect(() => {
        if (!onChange || !isEdit) return;

        onChange({
            ...sneakerData,
            ...images,
        });
    }, [sneakerData, images]);

    const [slides, setSlides] = useState([]); // for editing && product page

    useEffect(() => { // for editing
        if (!isEdit) return;
        setSlides([...(isEdit ? images.map(img => img.data) : imgSrcList), ...new Array(7)].slice(0, 7));
        console.log([...(isEdit ? images.map(img => img.data) : imgSrcList), ...new Array(7)].slice(0, 7));
    }, [images]);

    const [uploadEditMode, setUploadEditMode] = useState('move'); //move,delete
    const handleImageUpload = e => {
        const files = e.target.files;
        const currImages = [...images];
        for (let [i, file] of Object.entries(files)) {
            const reader = new FileReader();
            reader.readAsDataURL(file);

            reader.onload = () => {
                currImages.push({
                    data: reader.result,
                    name: file.name,
                });

                if (i >= files.length - 1) {
                    // once done, set image list
                    setImages(currImages);
                    e.target.value = '';
                }
            }

            reader.onerror = err => console.log(err);

            console.log(`Image ${i}: `, file);
        }
    }
    const handleDeleteImgUpload = index => {
        let newImages = [...images];
        newImages.splice(index, 1);
        setImages(newImages);
    }
    const handleMoveImg = (index, dirVal) => {
        if (index <= 0 || index >= images.length - 1) return;

        let nextIndex = index + dirVal;

        let newImages = [...images];
        let temp = newImages[index + dirVal];
        newImages[index + dirVal] = newImages[index];
        newImages[index] = temp;
        setImages(newImages);
    }

    const [toggleEdit, setToggleEdit] = useState(false);
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
                                            const { data } = images[i];
                                            return <div className={`${styles.box} ${styles.img}`} key={i.toString()}>
                                                <Image
                                                    loading='lazy'
                                                    src={data}
                                                    layout='fill'
                                                    className={styles.img}
                                                    alt={`Image Upload ${i + 1}`} />
                                                <div className={styles.controls}>
                                                    <div className={styles.left} onClick={e => handleMoveImg(i, -1)}>
                                                        <BsArrowLeftShort className={styles.icon} />
                                                    </div>
                                                    <div className={styles.right} onClick={e => handleMoveImg(i, 1)}>
                                                        <BsArrowRightShort className={styles.icon} />
                                                    </div>
                                                </div>
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

                <EditField title={'Sneaker Name'} valKey={'name'} toggleEdit={toggleEdit} snkrData={sneakerData} setSnkrData={setSneakerData}/>
                <div className={styles.name}>{sneakerData.name}</div>
                <br/>

                <EditField title={'Price'} valKey={'price'} toggleEdit={toggleEdit} snkrData={sneakerData} setSnkrData={setSneakerData}/>
                <div className={styles.price}>${sneakerData.price || 'null'}</div>
                <br/><br/>

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
                <EditField title={'Sizes'} valKey={'sizesStr'} toggleEdit={toggleEdit} snkrData={sneakerData} setSnkrData={setSneakerData}/>
                <br/><br/>

                <div className={styles.actions}>
                    <button className={styles.addToCart} onClick={handleAddToCart}>ADD TO CART</button>
                </div>
                <br/><br/>

                <div className={styles.description}>{sneakerData.descBody}</div>
                <EditField title={'Description'} valKey={'descBody'} toggleEdit={toggleEdit} snkrData={sneakerData} setSnkrData={setSneakerData}/>
                <br/><br/>

                <div className={styles.details}>{sneakerData.detailsBody}</div>
                <EditField title={'Details'} valKey={'detailsBody'} toggleEdit={toggleEdit} snkrData={sneakerData} setSnkrData={setSneakerData}/>
                <br/><br/>

                {
                    isEdit &&
                    <button className={styles.edit_toggle} onClick={handleToggleEdit}>
                        TOGGLE EDIT: {toggleEdit ? 'EDITING' : 'PREVIEW'}
                    </button>
                }
            </div>
        </div>
    )
}