import cv2 as cv
import numpy as np
oImg =cv.imread("PNG.png")
img=cv.cvtColor(oImg,cv.COLOR_BGR2GRAY)
_,mask=cv.threshold(img,120,255,cv.THRESH_BINARY)
kernel=np.ones((2,2),np.uint8)
dilate=cv.dilate(mask,kernel,iterations=5)

edges=cv.Canny(dilate,100,200)
lines=cv.HoughLinesP(edges,1,np.pi/180,100,minLineLength=1,maxLineGap=100)
print(len(lines))
for line in lines:
  x1,y1,x2,y2=line[0]
  cv.line(oImg,(x1,y1),(x2,y2),(0,255,0),3)

cv.imshow(oImg)

