let body=document.getElementById('body');
let img1=document.createElement('img');
let img2=document.createElement('img');
let img3=document.createElement('img');
let imgs=[img1,img2,img3];
let currenttop=0;
let status=[0,0,0];
body.appendChild(img1);
body.appendChild(img2);
body.appendChild(img3);
img1.setAttribute('class','depth');
img2.setAttribute('class','depth');
img3.setAttribute('class','depth');
function totop(n){
    for (let i=0;i<3;i++){
        if ((n+1)%3!==i)
            imgs[i].style.opacity=0;
        else
            imgs[i].style.opacity=1;
    }
    currenttop=(currenttop+1)%3;
}
imgrequest=(n)=>{
    let url='null'
    let s=fetch('https://api.gmit.vip/Api/DmImg?format=json').then(
        response=>{
            if (response.ok)
            {
                return response.json();
            }
        }
    ).then(
        info=>{
            console.log(info);
            console.log(info.data.url)
            url=info.data.url;
            w=new Promise((resolve, reject)=>{
                imgs[n].onload=()=>{
                    resolve();
                }
                setTimeout(3000,()=>{
                    reject();
                })

            }).then(()=>{
                status[n]=1;
            }).catch(err=>{
                console.log(err);
                imgrequest(n);
            })
            imgs[n].src=url;
        }
    ).catch(
        err=>{
            console.log(err)
            if (url==='null')
                imgrequest(n);
        }
    )

}
totop(0);
imgrequest(0);
imgrequest(1);
imgrequest(2);
body.onclick=()=>{
if (status[0]+status[1]+status[2]<=1)
    return;
else {
    imgrequest(currenttop);
    totop(currenttop);
}
}