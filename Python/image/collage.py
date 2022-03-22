#! python3
# -*- encoding: utf8 -*-

import sys
import os
import math
from PIL import Image
import numpy as np


dir_path = sys.argv[1]
target_path = './' + 'collage.png'


files = os.listdir(dir_path)

gap = 2
cell = (40, 40)
row = math.ceil(math.sqrt(len(files)))
col = len(files) // row


country_list = []

collage_w = (cell[0] + gap) * col
collage_h = (cell[1] + gap) * row

collage_im = Image.new('RGBA', (collage_w, collage_h))



for i in range(0, len(files)):
    file = files[i]
    x = i % col * (cell[0] + gap)
    y = i // col * (cell[1] + gap)

    flag_path = dir_path + '/' + file
    flag_im = Image.open(flag_path)
    flag_im.thumbnail(cell)
    w,h = flag_im.width, flag_im.height

    x = x + math.ceil((cell[0] - w) / 2)
    y = y + math.ceil((cell[1] - h) / 2)

    collage_im.paste(flag_im, (x, y))

    country_list.append(file[0:file.find('.')])

data = {
    'width': collage_w,
    'height': collage_h,
    'cell': [cell[0], cell[1]],
    'col': col,
    'gap': gap,
    'list': country_list,
}

print(data)


collage_im.save(target_path, **{ 'optimize': True, 'compress_level': 9 })
