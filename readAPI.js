var obj = null
$.ajaxSetup({
	async: false
});
var shab = null;
function createPost(obj, i) {
	let clone = shab.cloneNode(true);
	clone.style.display = "block";
	clone.setAttribute("class", "post");
	clone.setAttribute("name", obj.result[i].channel_post.message_id);
	document.body.appendChild(clone);
	$(".post[name='" + obj.result[i].channel_post.message_id + "']").find(".ya-share2")[0].setAttribute("data-url", 'https://t.me/Arseniychannels/' + obj.result[i].channel_post.message_id);
	return clone;
}
$(function () {
	shab = document.getElementsByClassName("Main_post")[0];


	$.getJSON('https://api.telegram.org/bot1724756333:AAFcUfS6qKZp8Xdz8_7wweSDa2EbrrughVg/getUpdates', function (data) {
		obj = data;
		console.log(data);
		for (var i = obj.result.length-1; i >= 0; i--) {
			if (JSON.stringify(obj.result[i]).includes("channel_post")){

				if (!JSON.stringify(obj.result[i]).includes("media_group_id")) {
					var clone = createPost(obj, i);
					if (JSON.stringify(obj.result[i]).includes("photo")) {
						if(obj.result[i].channel_post.caption!=null)
						{
							clone.children[0].innerHTML = obj.result[i].channel_post.chat.title + "<br><br>" + obj.result[i].channel_post.caption + "<br>";
						}
						var n = obj.result[i].channel_post.message_id;
						$.getJSON('https://api.telegram.org/bot1724756333:AAFcUfS6qKZp8Xdz8_7wweSDa2EbrrughVg/getFile?file_id=' + obj.result[i].channel_post.photo[0].file_id, function (data2) {
							var obj2 = data2;
							var mmm = document.createElement('img');
							mmm.src = 'https://api.telegram.org/file/bot1724756333:AAFcUfS6qKZp8Xdz8_7wweSDa2EbrrughVg/' + obj2.result.file_path;
							$('.post[name="' + n + '"]>p')[0].appendChild(mmm);
						});
					}
					else
						clone.children[0].innerHTML = obj.result[i].channel_post.chat.title + "<br><br>" + obj.result[i].channel_post.text.replace(/(?:\r\n|\r|\n)/g, '<br>');
				} else {
					var find_group = $('.post[group="' + obj.result[i].channel_post.media_group_id + '"]');
					if (find_group.length == 0) {
						var clone = createPost(obj, i);
						clone.setAttribute("group", obj.result[i].channel_post.media_group_id);
						clone.children[0].innerHTML = obj.result[i].channel_post.chat.title + "<br><br>";
						if (JSON.stringify(obj.result[i]).includes("photo")) {
							var n = obj.result[i].channel_post.message_id;
							$.getJSON('https://api.telegram.org/bot1724756333:AAFcUfS6qKZp8Xdz8_7wweSDa2EbrrughVg/getFile?file_id=' + obj.result[i].channel_post.photo[0].file_id, function (data2) {
								var obj2 = data2;
								var mmm = document.createElement('img');
								mmm.src = 'https://api.telegram.org/file/bot1724756333:AAFcUfS6qKZp8Xdz8_7wweSDa2EbrrughVg/' + obj2.result.file_path;
								$('.post[name="' + n + '"]>p')[0].appendChild(mmm);
							});
						}
						else
							clone.children[0].innerHTML = obj.result[i].channel_post.chat.title + "<br><br>" + obj.result[i].channel_post.text.replace(/(?:\r\n|\r|\n)/g, '<br>');
					} else {
						if (JSON.stringify(obj.result[i]).includes("photo")) {
							var n = obj.result[i].channel_post.message_id;
							$.getJSON('https://api.telegram.org/bot1724756333:AAFcUfS6qKZp8Xdz8_7wweSDa2EbrrughVg/getFile?file_id=' + obj.result[i].channel_post.photo[0].file_id, function (data2) {
								var obj2 = data2;
								var mmm = document.createElement('img');
								mmm.src = 'https://api.telegram.org/file/bot1724756333:AAFcUfS6qKZp8Xdz8_7wweSDa2EbrrughVg/' + obj2.result.file_path;
								find_group[0].children[0].appendChild(mmm);
							});
						}
						else
							clone.children[0].innerHTML = obj.result[i].channel_post.chat.title + "<br><br>" + obj.result[i].channel_post.text.replace(/(?:\r\n|\r|\n)/g, '<br>');
					}
				}
			}
		}
	})
})

