(function($){
   $.fn.tools = function(params)
    {
        var $data = null;
        
        return ($data != null) ? $data:$data = new Tools(this, params);
    }    

    var Tools = function(element, params)
    {
        this.$el = $(element);
        
        this.$params = $.extend({
            
        }, params);
        
        this.init();
    }

    Tools.prototype = {  
        $el: null,
        
        $params: null,
        
        $self: null,
        
        init: function()
        {            
            $el = this.$el;
            $params = this.$params;
            $self = this;
            
            return this;
        },
        ajaxBox: function() {
            $el.each(function(i, el) {
               var $t = $(el);
               
               $t.bind('click', function() {
                   var $loc = $(this);
                   var $href = $loc.attr('href');
                   
                   $.ajax({
                       url: $href,
                       type: 'GET',
                       success: function(response) {
                           $modal = $self.modalBox('Test', response, 'OK');
                   
                            $('body').append($modal);
                       }
                   })
                   
                   
                   
                   return false;
               });
            });
            
            console.log("je suis rendu au ajaxBox")
        },
        checkAll: function()
        {
            console.log("je suis rendu au checkall")
        },
        modalBox: function(title, content, btnAction, btnCancel)
        {            
            var $modal = this.createModalBlox(title, content, btnAction, btnCancel);

            $('body').append($modal);

            $modal.modal('show');

            $modal.on('hidden', function() {
                $(this).remove();
            });
            
            return $modal;
        },
        createModalBlox: function(title, content, btnAction, btnCancel)
        {
            var $title = $('<h3>').text(title);
            var $btnClose = $('<button>').attr('type', 'button').addClass('close').attr('data-dismiss', 'modal').text('×');
            
            var $header = $('<div>').addClass('modal-header');
            $header.append($btnClose);
            $header.append($title);
            
            var $body = $('<div>').addClass('modal-body');
            $body.html(content);
            
            var $btnCancel = $('<a>').attr('href', '#').addClass('btn btn-cancel').attr('data-dismiss', 'modal').text(btnCancel);            
            var $btnAction = $('<a>').attr('href', '#').addClass('btn btn-primary btn-action').attr('data-dismiss', 'modal').text(btnAction);
            
            var $footer = $('<div>').addClass('modal-footer');     
            
            if(btnCancel != null)
            {
                $footer.append($btnCancel);
            }
            
            $footer.append($btnAction);
            
            var $modal = $('<div>').addClass('modal hide fade in').attr('id', 'modal');
            
            $modal.append($header);
            $modal.append($body);
            $modal.append($footer);
            
            return $modal;
        }
    }
})(jQuery);