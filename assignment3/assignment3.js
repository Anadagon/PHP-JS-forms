// Execute function after page is fully loaded.
	$(document).ready(function() {
	        /* on mouse over or mouse out call openSubMenu or closeSubMenu 
	         * respectively for the selected element. ".bind" represents the
	         * connection between the function called on the event for the element
	         * specified
	         */
		    $('.myMenu > li').bind('mouseover', openSubMenu);
		    $('.myMenu > li').bind('mouseout', closeSubMenu);
		
		    /* these functions are the handlers for the mouse over and mouse out
		     * events. When a list item from "mymenu" is moused over the visibility
		     * css attribute for the unordered list inside of a list item inside 
		     * mymenu is set to "visible" instead of hidden. The reverse is true
		     * for mousing out of a list item in mymenu
		     */
		    function openSubMenu() {
			    $(this).find('ul').css('visibility', 'visible');	
		    };
		
		    function closeSubMenu() {
			    $(this).find('ul').css('visibility', 'hidden');	
		    };
    });
