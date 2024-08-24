import Embed from '@editorjs/embed';
import List from '@editorjs/list'
import Image from '@editorjs/image'
import Header from '@editorjs/header'
import Quote from '@editorjs/quote'
import Marker from '@editorjs/marker'
import InlineCode from '@editorjs/inline-code'
import { uploadImage } from '@/actions';
import Checklist from '@editorjs/checklist';
import CodeTool from '@editorjs/code';
import TextVariantTune from '@editorjs/text-variant-tune';
import Table from '@editorjs/table'
const uploadImageByFile = async(e: any) => {
    const reader = new FileReader();
      reader.readAsDataURL(e);
      const imgUrl = await new Promise<string>((resolve) => {
        reader.onload = () => {
          if (reader.result) {
            resolve(reader.result as string);
          } else {
            resolve("");
          }
        };
      });
      const uploadImageUrl = await uploadImage(imgUrl);
      if (uploadImageUrl) {
        return {
            success: 1,
            file: { url: uploadImageUrl.secure_url }
        }
      }
}
const uploadImageByUrl = (e: any) => {
    let link = new Promise((resolve, reject) => {
        try {
            resolve(e)
        } catch (error) {
            console.log(error)
            reject(error);
        }
    });
    return link.then(url => {
        return{
            success: 1,
            file: { url }
        }
    })
}

export const Tools = {
    embed: Embed,
    list: {
        class: List,
        inlineToolbar: true
    },
    image: {
        class: Image,
        config: {
            uploader: {
                uploadByUrl: uploadImageByUrl,
                uploadByFile: uploadImageByFile,
            }
        }
    },
    header: {
        class: Header,
        config: {
            placeholder: "Type Heading..",
            levels: [2, 3, 4, 5, 6],
            defaultLevel: 2,
        }
    },
    quote: {
        class: Quote,
        inlineToolbar: true
    },
    marker: Marker,
    inlinecode: InlineCode,
    checklist: {
        class: Checklist,
        inlineToolbar: true
    },
    table: {
        class: Table,
        inlineToolbar: true
    },
    textVariantTune: {
        class: TextVariantTune
    },
    code: {
        class: CodeTool,
        config: {
            placeholder: 'Enter code here...'
        }
    }
};
