define('parsley/factory/constraint', [
  'parsley/utils'
], function (ParsleyUtils) {
  return ConstraintFactory = function (parsleyField, name, requirements, priority, isDomConstraint) {

    if ('ParsleyField' !== ParsleyUtils.get(parsleyField, '__class__'))
      throw new Error('ParsleyField instance expected');

    if ('function' !== typeof parsleyField.Validator.validators[name] &&
      'Assert' !== parsleyField.Validator.validators[name](requirements).__parentClass__)
      throw new Error('Valid validator expected');

    var getPriority = function (parsleyField, name) {
      if ('undefined' !== typeof parsleyField.options[name + 'Priority'])
        return parsleyField.options[name + 'Priority'];

      return ParsleyUtils.get(parsleyField.Validator.validators[name](requirements), 'priority', 2);
    };

    priority = priority || getPriority(parsleyField, name);

    // TODO add group priority
    return $.extend(new parsleyField.Validator.validators[name](requirements), {
      name: name,
      requirements: requirements,
      priority: priority,
      groups: [priority],
      isDomConstraint: isDomConstraint || ParsleyUtils.attr(parsleyField.$element, parsleyField.options.namespace, name)
    });
  };
});
