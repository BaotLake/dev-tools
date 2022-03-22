#! python3
# -*- encoding: utf8 -*-

'''
分割文本，生成内容和模版json
'''


import json
from format import split


name = 'des_1.0.10'

text = '''Awesome Screen Recorder allows you to capture everything on your screen, whether you want to record gameplay, make game walkthroughs, app demos, reviews or tutorials, etc. After recording, you can trim the start and end to remove unwanted parts, add facecam reactions or voiceovers to enrich your recordings. Compressing video and converting video to GIF are also supported. 


Easily Record Screen 
    - One tap to start recording 
    - High-resolution for free   
    - No time limit 
    - No ads 
    - No watermarks 

Add Facecam Overlay 
    - Create a picture-in-picture effect 
    - Facecam picture can be dragged around
    - Add personality to your recording videos
    - Videos from Photos are also supported

Add Voiceover Narration
    - Record sound from your microphone 
    - Add audio commentary to make your video more engaging 

Trim Unwanted Parts 
    - Drag to change the start and end of your recording
    - Remove unnecessary parts from your video 

Compress video 
    - Reduce video size without significantly losing quality 
    - Free up some storage space on your phone 

Save or share with Ease 
    - Tap share button to save recordings to Photos  
    - Share videos to other apps 

Get the app and start creating your own recording videos today!
Feel free to contact us if you have any questions or suggestions.
'''

split_dict = split(text)


scheme_file = open('./scheme_' + name + '.json', 'w+', encoding='utf8')
scheme_file.seek(0)
scheme_file.write(json.dumps(split_dict['parts'], indent=4, ensure_ascii=False))
scheme_file.truncate()
scheme_file.close()

content_file = open('./content_' + name + '.json', 'w+', encoding='utf8')
content_file.seek(0)
content_file.write(json.dumps(split_dict['content'], indent=4, ensure_ascii=False))
content_file.truncate()
content_file.close()