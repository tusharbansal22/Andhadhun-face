import sys
import face_recognition

arg1 = sys.argv[1]
arg2 = sys.argv[2]

def image_check(file1,file2):
    known_image = face_recognition.load_image_file(file1)
    known_encoding = face_recognition.face_encodings(known_image)[0]

    unknown_image = face_recognition.load_image_file(file2)
    unknown_encoding = face_recognition.face_encodings(unknown_image)[0]

    results = face_recognition.compare_faces([known_encoding], unknown_encoding)
    return results[0]
sys.stdout.write(str(image_check(arg1,arg2)))
# sys.stdout.write('Hello, world')
# sys.stdout.flush()
print(image_check(arg1,arg2))
