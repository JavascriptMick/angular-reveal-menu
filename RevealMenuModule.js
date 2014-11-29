/**
 * @license RevealMenu
 * (c) 2014 Michael Dausmann
 * License: MIT
 */
angular.module('RevealMenuModule', [])
    .directive('revealmenu', function(){
        return {
            link: function(scope, elem, attrs){
                scope.sections = [];
                scope.index = {};
                scope.topIndex = {};
                scope.currentSection = {};
                scope.currentTopSection = {};
                var TAGS_ATTRIBUTE = "TAGS";

                var createEntryFromSection = function(section){
                    var entry={id:section.id, isActive:false, isTopActive:false};
                    Array.prototype.forEach.call(section.attributes,function(attribute){
                        if(attribute && attribute.name && attribute.name.indexOf && attribute.name.indexOf('data-') !== -1){
                            var name = attribute.name.replace('data-','');
                            if(name.toUpperCase()===TAGS_ATTRIBUTE){
                                entry.tags=[];
                                var tagValues = attribute.value.split(',');
                                for(var i = 0; i<tagValues.length; i++){
                                    entry.tags.push(tagValues[i].trim())
                                }
                            }else{
                                entry[name] = attribute.value;
                            }
                        }
                    });

                    if(section.className==="present"){
                        entry.isActive = true;
                    }

                    return entry;
                };

                var sections = angular.element("div.slides").children();
                for (var i = 0; i < sections.length; ++i) {
                    var section = sections[i];

                    if(section.id){
                        var entry = createEntryFromSection(section);
                        if(entry.isActive) {
                            entry.isTopActive = true;
                            scope.currentSection = entry;
                            scope.currentTopSection = entry;
                        }
                        entry.subEntries = [];

                        Array.prototype.forEach.call(section.children,function(childSection){
                            if(childSection.id) {
                                var subEntry = createEntryFromSection(childSection);
                                if (subEntry.isActive) {
                                    entry.isTopActive = true;
                                    scope.currentSection = subEntry;
                                    scope.currentTopSection = entry;
                                }
                                entry.subEntries.push(subEntry);
                                scope.index[subEntry.id] = subEntry;
                                scope.topIndex[subEntry.id] = entry;
                            }
                        });

                        scope.sections.push(entry);
                        scope.index[entry.id] = entry;
                        scope.topIndex[entry.id] = entry;
                    }
                }

                Reveal.addEventListener('slidechanged', function(event) {
                    var currentId = event.currentSlide?event.currentSlide.id:null;
                    var prevId = event.previousSlide?event.previousSlide.id:null;
                    if(currentId && scope.index[currentId] && scope.topIndex[currentId]){
                        scope.index[currentId].isActive = true;
                        scope.topIndex[currentId].isTopActive = true;
                        scope.currentSection = scope.index[currentId];
                    }
                    if(prevId && scope.index[prevId] && scope.topIndex[prevId]){
                        scope.index[prevId].isActive = false;
                        if(scope.topIndex[currentId] !== scope.topIndex[prevId]){
                            scope.topIndex[prevId].isTopActive = false;
                        }
                    }
                    scope.$apply();
                });
            }
        }
    });