let body=document.getElementById('body');
let img1=document.createElement('img');
let img2=document.createElement('img');
let img3=document.createElement('img');
let img4=document.createElement('img');
let img5=document.createElement('img');
let imgs=[img1,img2,img3,img4,img5];
let currenttop=0;
let status=[0,0,0,0,0];
body.appendChild(img1);
body.appendChild(img2);
body.appendChild(img3);
body.appendChild(img4);
body.appendChild(img5);
img1.setAttribute('class','depth');
img2.setAttribute('class','depth');
img3.setAttribute('class','depth');
img4.setAttribute('class','depth');
img5.setAttribute('class','depth');
function totop(n){
    for (let i=0;i<5;i++){
        if ((n+1)%5!==i)
            imgs[i].style.opacity=0;
        else
            imgs[i].style.opacity=1;
    }
    currenttop=(currenttop+1)%5;
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
imgrequest(3);
imgrequest(4);
body.onclick=()=>{
if (status[0]+status[1]+status[2]+status[3]+status[4]<=1||(status[(currenttop+1)%5]===0))
    alert("阿伟，你太快了,下张图还没加载好")
else {
    status[currenttop]=0;
    imgrequest(currenttop);
    totop(currenttop);
}
}