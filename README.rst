jquery.shadowdom.js
===================

jQuery experiment trying to emulate the encapsulation of the shadow DOM.

To understand the motivations of this project I strongly suggest reading
this: http://glazkov.com/2011/01/14/what-the-heck-is-shadow-dom/

TL;DR: Sometimes you want to have a self contained html component. Something
       that is not modifiable and accessible with the page's JavaScript or CSS.
       
       This is especially useful when creating UI components. To acomplish this I 
       use the iframe method . It is heavy on resources, but used intelligently
       it works pretty well (ex: create a self contained toolbar instead of self 
       contained individual buttons).


Examples
========

Basic
^^^^^

Let's say you have a `div#test` in your webpage. To create a shadowdom element and
then create and insert a html element into it simple do::

    $(function(){
        var myElement = $('<b>Yay.</b>');
        $('#test').shadowdom().append(myElement);
    });

In the background, the shadowdom method returns the body of the shadowdom iframe
if the iframe exists or else it creates it and return its body.

So the manipulation is pretty standard stuff.

Loading CSS
^^^^^^^^^^^

Loading CSS is quite straight forward too::


    <link type="text/css+shadowdom" rel="stylesheet+shadowdom" href="styles/yessir.css" />
    <style type="text/css+shadowdom" rel="stylesheet+shadowdom">
        html {
            margin: 0;
            padding: 0;
        }
    </style>

`+shadowdom` serves to prevent the browser from parsing the CSS for the host document.
It is required to add it to the `type` and `rel` attribute. In fact specifying it twice
is not necessary, but I advise it to avoid confusion because for `<link>` tags, the rel 
works but not the type whereas on the `<style>` tags, the type works, but not the rel.. `ಠ_ಠ`


Loading JS
^^^^^^^^^^

I did not find an elegant way to load JavaScript into an iframe. The trick I use for CSS 
doesn't work. That said, loading JavaScript into the iframe it not that useful since it 
can't communicate with its parent window.

So it's better to manipulate the shadowdoms from the outside like this::


    $(function(){
        $('.toolbars').shadowdom().find('a.button')
            .bind('click', function() {
                // Do your stuff ..
            });
    });


