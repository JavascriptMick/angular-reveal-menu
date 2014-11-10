angular.module('RevealMenuModule', [])
    .directive('revealmenu', function(){
        return {
            link: function(scope, elem, attrs){
                scope.sections = [];
                scope.index = {};
                scope.currentSection = {};
                var sections = angular.element("div.slides").children();

                var index; var section;
                for (var i = 0; i < sections.length; ++i) {
                    section = sections[i];
                    if(section.id){
                        var entry={id:section.id, isActive:false};
                        Array.prototype.forEach.call(section.attributes,function(attribute){
                            if(attribute && attribute.name && attribute.name.indexOf && attribute.name.indexOf('data-') !== -1){
                                entry[attribute.name.replace('data-','')] = attribute.value;
                            }
                        })
                        if(section.className==="present"){
                            entry.isActive = true;
                            scope.currentSection = entry;
                        }
                        scope.sections.push(entry);
                        scope.index[entry.id] = entry;
                    }

                }

                Reveal.addEventListener('slidechanged', function(event) {
                    var id = event.currentSlide?event.currentSlide.id:null;
                    var prevId = event.previousSlide?event.previousSlide.id:null;
                    if(id && scope.index[prevId]){
                        scope.index[id].isActive = true;
                        scope.currentSection = scope.index[id];
                    }
                    if(prevId && scope.index[prevId]){
                        scope.index[prevId].isActive = false;
                    }
                    scope.$apply();
                });
            }
        }
    });