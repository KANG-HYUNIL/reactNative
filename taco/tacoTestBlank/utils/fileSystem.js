import { Platform } from 'react-native';
import RNFS from 'react-native-fs';
import fs from 'fs';
import path from 'path';

//모바일 인지 웹인지에 따라 사용자 데이터를 저장하기 위한 폴더 경로를 설정
const userDataPath = Platform.OS === 'web' ? path.resolve(__dirname, '..', 'userData') : `${RNFS.DocumentDirectoryPath}/userData`;

//모바일 디바이스 환경에서 사용자 데이터를 저장하기 위한 폴더를 생성하는 메서드
export const createFolder = async (folderName) => {
    const folderPath = `${userDataPath}/${folderName}`;
    try {
        if (Platform.OS === 'web') 
        {
          // 웹 환경에서 폴더 생성
          if (!fs.existsSync(folderPath)) 
        {
            fs.mkdirSync(folderPath, { recursive: true });
            console.log(`Folder created at ${folderPath}`);
          } 
          else 
          {
            console.log(`Folder already exists at ${folderPath}`);
          }
        } 
        else 
        {
          // 모바일 환경에서 폴더 생성
          if (!(await RNFS.exists(userDataPath))) 
          {
            await RNFS.mkdir(userDataPath);
          }
          // 폴더가 존재하지 않으면 생성
          if (!(await RNFS.exists(folderPath))) 
          {
            await RNFS.mkdir(folderPath);
          }
        }
      } catch (error) {
        console.error('Error creating folder:', error);
        throw error;
      }
} //createFolder

//모바일 디바이스 환경에서 사용자 데이터를 저장하기 위한 파일를 생성하는 메서드
export const createJsonFile = async (folderName, fileName, content) => {
    const folderPath = `${userDataPath}/${folderName}`;
    const filePath = `${folderPath}/${fileName}`;
  
    try {
        //웹 환경일 때에
      if (Platform.OS === 'web') {
        // 웹 환경에서 JSON 파일 생성
        if (!fs.existsSync(folderPath)) 
        {
          fs.mkdirSync(folderPath, { recursive: true });
        }
        const jsonString = JSON.stringify(content); //json 문자열 변환
        fs.writeFileSync(filePath, jsonString, 'utf8');
        console.log(`JSON file created at ${filePath}`);
      } 
      //모바일 환경일 때에
      else {
        // 모바일 환경에서 JSON 파일 생성
        if (!(await RNFS.exists(folderPath)))
        {
          await RNFS.mkdir(folderPath);
        }
        const jsonString = JSON.stringify(content); //json 문자열 변환
        await RNFS.writeFile(filePath, jsonString, 'utf8');
        console.log(`JSON file created at ${filePath}`);
      }
    } 
    catch (error) {
      console.error('Error creating JSON file:', error);
      throw error;
    }
};//createFile

//JSOn 파일 읽기 메서드
export const readJsonFile = async (folderName, fileName) => {
    const filePath = `${userDataPath}/${folderName}/${fileName}`; //읽을 파일의 경로

    try {
        if (Platform.OS === 'web') 
        {
            // 웹 환경에서 JSON 파일 읽기
            if (fs.existsSync(filePath)) 
            {
                const jsonString = fs.readFileSync(filePath, 'utf8');
                const jsonData = JSON.parse(jsonString);
                console.log(`JSON file read from ${filePath}`);
                return jsonData;
            } 
            //파일이 존재하지 않을 때는 false 반환
            console.log(`JSON file does not exist at ${filePath}`);
            return false;

        }
        else 
        {
        // 모바일 환경에서 JSON 파일 읽기
        if (!(await RNFS.exists(filePath))) 
        {
            //파일이 존재하지 않을 때는 false 반환
            console.log(`JSON file does not exist at ${filePath}`);
            return false;
        }

        //파일이 존재할 때는 파일을 읽어서 JSON으로 파싱
        const jsonString = await RNFS.readFile(filePath, 'utf8');
        const jsonData = JSON.parse(jsonString);
        console.log(`JSON file read from ${filePath}`);
        return jsonData;
        }
    } catch (error) {
        console.error('Error reading JSON file:', error);
        throw error;
    }
}//readJsonFile

//Image 파일 생성 메서드
export const createImageFile = async (folderName, fileName, content) => {
    const folderPath = `${userDataPath}/${folderName}`; //폴더 경로
    const filePath = `${folderPath}/${fileName}`; //파일 경로
  
    try {
      if (Platform.OS === 'web') 
      {
        // 웹 환경에서 이미지 파일 생성
        if (!fs.existsSync(folderPath)) 
        {
          fs.mkdirSync(folderPath, { recursive: true });
        }
        fs.writeFileSync(filePath, content, 'base64');
        console.log(`Image file created at ${filePath}`);
      } 
      else 
      {
        // 모바일 환경에서 이미지 파일 생성
        if (!(await RNFS.exists(folderPath))) 
        {
          await RNFS.mkdir(folderPath);
        }
        await RNFS.writeFile(filePath, content, 'base64');
        console.log(`Image file created at ${filePath}`);
      }
    } 
    catch (error) 
    {
      console.error('Error creating image file:', error);
      throw error;
    }
  }//createImageFile

  //Image 파일 읽기 메서드
export const readImageFile = async (folderName, fileName) => {
const filePath = `${userDataPath}/${folderName}/${fileName}`; //읽을 파일의 경로

    try {
        if (Platform.OS === 'web') 
        {
        // 웹 환경에서 이미지 파일 읽기
            if (fs.existsSync(filePath)) 
            {
                const base64Data = fs.readFileSync(filePath, 'base64');
                console.log(`Image file read from ${filePath}`);
                return base64Data;
            } 
            //파일이 존재하지 않을 때는 false 반환
            console.log(`Image file does not exist at ${filePath}`);
            return false;

        }
        else         
        {
            // 모바일 환경에서 이미지 파일 읽기
            if (!(await RNFS.exists(filePath))) 
            {
                //파일이 존재하지 않을 때는 false 반환
                console.log(`Image file does not exist at ${filePath}`);
                return false;
            }
            const base64Data = await RNFS.readFile(filePath, 'base64');
            console.log(`Image file read from ${filePath}`);
            return base64Data;
        }
    } catch (error) {
        console.error('Error reading image file:', error);
        throw error;
    }
}//readImageFile


